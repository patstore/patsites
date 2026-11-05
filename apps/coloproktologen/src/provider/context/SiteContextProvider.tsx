import React, {
    useMemo,
    useContext,
    createContext,
    useState,
    useCallback,
    useEffect
} from "react";
import { SiteContext as SiteContextProps } from "./types";
import { apiGet, apiRequest } from "../data";
import EmailModal from "./components/EmailModal";
import { useLocation } from "@tanstack/react-router";
import { ColoproktologenUser } from "@types";
import useGetLocation from "../hooks/patstore/useGetLocation";

const SiteContext = createContext({
    siteTitle: "",
    siteDescription: "",
    contactOpen: false,
    applicationOpen: false,
    setApplicationOpen: () => null,
    loading: false,
    user: undefined,
    getUser: async () => {
        await apiGet("/api/session");
    },
    locations: [],
    users: []
} as SiteContextProps);

export const SiteContextProvider = ({
    children
}: {
  children: React.ReactNode;
}) => {
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState<ColoproktologenUser[]>([]);
    const { locations } = useGetLocation();

    const findUsers = useCallback(() => {
        apiRequest<{ result: ColoproktologenUser[] }>("/api/specialists")
            .then((response) => {
                setUsers(response.result ?? []);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    useEffect(() => {
        if (users.length === 0) {
            findUsers();
        }
    }, [findUsers, users]);

    const [user, setUser] = useState<ColoproktologenUser>();
    const { pathname } = useLocation();

    const [applicationOpen, setApplicationOpen] = useState(false);

    const getUser = useCallback(async () => {
        try {
            const response = await apiGet<{
                user: ColoproktologenUser | null;
                expired?: boolean;
            }>("/api/session");
            if (response.expired && pathname.includes("/app")) {
                window.location.href = "/login";
                return;
            }
            setUser(response.user ?? undefined);
        } catch (error) {
            if (process.env.NODE_ENV === "development") {
                console.error(error);
            }
            setUser(undefined);
        } finally {
            setLoading(false);
        }
    }, [pathname]);

    useEffect(() => {
        getUser();
    }, [getUser]);

    const siteContext = useMemo(() => {
        return {
            siteTitle: "My Site",
            siteDescription: "My site description",
            applicationOpen,
            setApplicationOpen,
            loading,
            user,
            getUser,
            locations,
            users
        };
    }, [applicationOpen, user, loading, getUser, locations, users]);

    const [emailPopup, setEmailPopup] = useState(false);

    useEffect(() => {
        if (pathname.includes("/app") && user && !user.email) {
            setEmailPopup(true);
        }
    }, [user, pathname]);

    return (
        <SiteContext.Provider value={siteContext}>
            {children}
            {user && (
                <EmailModal
                    emailPopup={emailPopup}
                    setEmailPopup={setEmailPopup}
                    getUser={getUser}
                    userId={user?.objectId}
                />
            )}
        </SiteContext.Provider>
    );
};

export const useSiteContext = () => {
    return useContext(SiteContext);
};
