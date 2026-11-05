import { asRecord, parseErrorResponse, readBody } from "@repo/server/auth";
import { createFileRoute } from "@tanstack/react-router";
import { sessionApi } from "../../../server/auth";

const LOCATION_MODULE_ID = "oG2z7k0IQP";

export const Route = createFileRoute("/api/account/clinic")({
    server: {
        handlers: {
            POST: async ({ request }) => {
                const auth = await sessionApi.requireUser(request);
                if (auth instanceof Response) {
                    return auth;
                }

                const body = await readBody(request);
                const doctorData = asRecord(body.doctorData);
                const userId = auth.user.objectId;
                if (!doctorData || typeof userId !== "string") {
                    return Response.json({ message: "Angaben fehlen" }, { status: 400 });
                }

                const currentData = asRecord(auth.user.data) ?? {};
                const currentBcd = asRecord(currentData.bcd) ?? {};
                const description =
                    typeof doctorData.klinikposition === "string"
                        ? doctorData.klinikposition
                        : "";

                try {
                    let locationId = typeof body.locationId === "string" ? body.locationId : "";
                    if (!locationId) {
                        const clinic = asRecord(body.clinic);
                        const coordinates = asRecord(clinic?.coordinates);
                        const clinicData = asRecord(clinic?.data);
                        if (!clinic || !coordinates || !clinicData) {
                            return Response.json(
                                { message: "Klinikdaten fehlen" },
                                { status: 400 }
                            );
                        }
                        const created = await sessionApi.createObject(
                            "Location",
                            {
                                project: {
                                    __type: "Pointer",
                                    className: "Project",
                                    objectId: sessionApi.config.projectId
                                },
                                module: {
                                    __type: "Pointer",
                                    className: "Module",
                                    objectId: LOCATION_MODULE_ID
                                },
                                title: clinic.title,
                                description: clinic.description,
                                coordinates: {
                                    __type: "GeoPoint",
                                    latitude: coordinates.latitude,
                                    longitude: coordinates.longitude
                                },
                                data: {
                                    strasse: clinicData.strasse,
                                    plz: clinicData.plz,
                                    ort: clinicData.ort,
                                    tel: clinicData.tel,
                                    fax: clinicData.fax,
                                    email: clinicData.email
                                }
                            },
                            auth.token
                        );
                        locationId = String(created.objectId);
                    }

                    await sessionApi.updateUser(auth.token, userId, {
                        location: locationId,
                        description,
                        data: {
                            ...currentData,
                            bcd: {
                                ...currentBcd,
                                ...doctorData
                            }
                        }
                    });
                    return Response.json({ ok: true });
                } catch (error) {
                    return parseErrorResponse(error);
                }
            }
        }
    }
});
