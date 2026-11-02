import { env } from "@env";
import React, {
    useMemo,
    useContext,
    createContext,
    useState,
    useCallback,
    useEffect
} from "react";
import { SiteContext as SiteContextProps } from "./types";
import { axiosclient } from "../data";
import EmailModal from "./components/EmailModal";
import { useLocation } from "@tanstack/react-router";
import Cookies from "js-cookie";
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
        await axiosclient().get("/users/me");
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
        axiosclient().post("/functions/find_bcd_specialists")
            .then((response) => {
                setUsers(response.data.result);
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
        await axiosclient()
            .get("/users/me")
            .then((response) => {
                setUser(response.data as ColoproktologenUser);
                setLoading(false);
            })
            .catch((error) => {
                if (process.env.NODE_ENV === "development") {
                    console.error(error);
                }
                setLoading(false);
            });
    }, []);

    const localToken = Cookies.get(env.sessionToken);

    useEffect(() => {
        if (!localToken) {
            setLoading(false);
            return;
        }
        if (!user) {
            getUser();
        } else {
            setLoading(false);
        }
    }, [pathname, localToken, user, getUser]);

    useEffect(() => {
        if (user?.expires_at) {
            const expires_at_date = new Date(user.expires_at.iso);
            const current_date = new Date();
            if (expires_at_date < current_date) {
                Cookies.remove(env.sessionToken);
                setUser(undefined);
                if (pathname.includes("/app")) {
                    window.location.href = "/login";
                }
            }
        }
    }, [user]);

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
