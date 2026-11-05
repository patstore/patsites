import React, {
    useMemo,
    useContext,
    createContext,
    useState,
    useCallback,
    useEffect
} from "react";
import { SiteContext as SiteContextProps } from "./types";
import { apiGet } from "../data";
import EmailModal from "./components/EmailModal";
import { useLocation } from "@tanstack/react-router";
import { KoloproktologieUser } from "@types";

const SiteContext = createContext({
    siteTitle: "",
    siteDescription: "",
    contactOpen: false,
    applicationOpen: false,
    setApplicationOpen: () => null,
    loading: true,
    user: undefined,
    getUser: async () => {
        await apiGet("/api/session");
    }
} as SiteContextProps);

export const SiteContextProvider = ({
    children
}: {
    children: React.ReactNode;
}) => {
    const [loading, setLoading] = useState(true);

    const [user, setUser] = useState<KoloproktologieUser | undefined>();
    const { pathname } = useLocation();

    const [applicationOpen, setApplicationOpen] = useState(false);

    const getUser = useCallback(async () => {
        try {
            const response = await apiGet<{ user: KoloproktologieUser | null }>(
                "/api/session"
            );
            setUser(response.user ?? undefined);
        } catch {
            setUser(undefined);
        } finally {
            setLoading(false);
        }
    }, []);

    console.log({user})

    useEffect(() => {
        getUser();
    }, [pathname, getUser]);

    const siteContext = useMemo(() => {
        return {
            siteTitle: "My Site",
            siteDescription: "My site description",
            applicationOpen,
            setApplicationOpen,
            loading,
            user,
            getUser
        };
    }, [applicationOpen, user, loading, getUser]);

    const [emailPopup, setEmailPopup] = useState(false);

    useEffect(() => {
        if (pathname.includes("/app") && user && !user.email) {
            setEmailPopup(true);
        }
    }, [user, pathname]);

    return (
        <SiteContext.Provider value={siteContext}>
            {children}
            <EmailModal
                emailPopup={emailPopup}
                setEmailPopup={setEmailPopup}
                getUser={getUser}
                userId={user?.objectId || ""}
            />
        </SiteContext.Provider>
    );
};

export const useSiteContext = () => {
    return useContext(SiteContext);
};
