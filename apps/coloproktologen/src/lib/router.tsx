import { Link as RouterLink, useNavigate, type LinkProps } from "@tanstack/react-router";
import type { CSSProperties, ReactNode } from "react";

type AppLinkProps = Omit<LinkProps, "to" | "hash"> & {
    to: string;
    css?: unknown;
    style?: CSSProperties;
    className?: string;
    children?: ReactNode;
    activeStyle?: unknown;
};

/** Link that accepts the string paths used by the previous Gatsby site, including hashes. */
export function Link({ to, activeStyle: _activeStyle, ...props }: AppLinkProps) {
    if (to.includes("#")) {
        const [path, hash] = to.split("#");
        return <RouterLink to={(path || "/") as never} hash={hash} {...(props as object)} />;
    }
    return <RouterLink to={to as never} {...(props as object)} />;
}

let navigateImpl = (to: string) => {
    if (typeof window !== "undefined") {
        window.location.assign(to);
    }
};

export function setNavigate(navigateTo: (to: string) => void) {
    navigateImpl = navigateTo;
}

export function navigate(to: string, _options?: { replace?: boolean }) {
    navigateImpl(to);
}

/** Registers imperative navigation once the TanStack router exists. */
export function NavigateBridge() {
    const routerNavigate = useNavigate();
    setNavigate((to: string) => {
        if (to.startsWith("#")) {
            routerNavigate({ hash: to.slice(1) });
            return;
        }
        const hashIndex = to.indexOf("#");
        if (hashIndex >= 0) {
            routerNavigate({
                to: (to.slice(0, hashIndex) || "/") as never,
                hash: to.slice(hashIndex + 1)
            });
            return;
        }
        routerNavigate({ to: to as never });
    });
    return null;
}
