import { Mail } from "lucide-react";
import { colors } from "@/settings";
import { useThemeStore } from "@/components";

const ORBIT = 85;

const ContactIcon = () => {
    const { theme } = useThemeStore();
    const cx = ORBIT / 2;
    const cy = ORBIT / 2;
    const r = ORBIT / 2 - 6;
    const path = `M ${cx},${cy} m -${r},0 a ${r},${r} 0 1,1 ${2 * r},0 a ${r},${r} 0 1,1 -${2 * r},0`;
    const label = "Kontakt -  Kontakt -  Kontakt -  Kontakt -  ";

    return (
        <div className="head-contact-icon-container">
            <a
                href="#contact"
                className="head-contact-icon"
                css={{
                    backgroundColor:
                        theme === "dark" ? colors.primary : colors.dark
                }}
            >
                <Mail
                    size={18}
                    color={theme === "dark" ? colors.dark : colors.primary}
                    strokeWidth={1.5}
                />
            </a>
            <svg
                className="head-contact-icon-orbit"
                viewBox={`0 0 ${ORBIT} ${ORBIT}`}
                aria-hidden="true"
            >
                <defs>
                    <path
                        id="contactCirclePath"
                        d={path}
                        fill={theme === "dark" ? colors.primary : colors.white}
                    />
                </defs>
                <text
                    fill={theme === "dark" ? colors.primary : colors.dark}
                    fontSize="9.5"
                    letterSpacing="1.5"
                    fontFamily="inherit"
                >
                    <textPath href="#contactCirclePath">{label}</textPath>
                </text>
            </svg>
        </div>
    );
};

export default ContactIcon;
