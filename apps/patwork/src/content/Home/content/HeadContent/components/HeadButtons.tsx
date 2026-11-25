import { ArrowDownIcon, ArrowRightIcon } from "lucide-react";
import React from "react";
import { useNavigate } from "@tanstack/react-router";

const HeadButtons = () => {
    const navigate = useNavigate();
    return (
        <div className="head-buttons">
            <button
                onClick={() => {
                    navigate({ to: "/", hash: "studio" });
                }}
            >
                Mehr über patwork
                <ArrowDownIcon size={12} />
            </button>
            <button
                onClick={() => {
                    navigate({ to: "/projekte" });
                }}
            >
                Projekt
                <ArrowRightIcon size={12} />
            </button>
        </div>
    );
};

export default HeadButtons;
