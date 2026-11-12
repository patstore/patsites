import { useEffect, useId, useRef, useState, type HTMLAttributes } from "react";
import { createPortal } from "react-dom";
import styles from "../Services.module.css";

export type ServiceMember = {
  id: string;
  name: string;
  src: string | null;
};

type ServiceSlideInProps = {
  open: boolean;
  title: string;
  text: string | null;
  members: ServiceMember[];
  onClose: () => void;
};

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

const ServiceSlideIn = ({ open, title, text, members, onClose }: ServiceSlideInProps) => {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) {
      return;
    }

    const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    closeRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onCloseRef.current();
        return;
      }
      if (event.key !== "Tab") {
        return;
      }
      const panel = panelRef.current;
      if (!panel) {
        return;
      }
      const focusable = [...panel.querySelectorAll<HTMLElement>(FOCUSABLE)];
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) {
        return;
      }
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      previous?.focus();
    };
  }, [open]);

  if (!mounted) {
    return null;
  }

  return createPortal(
    <>
      <div
        className={styles.overlay}
        data-open={open ? "true" : "false"}
        data-lenis-prevent
        onClick={onClose}
      />
      <div
        ref={panelRef}
        className={styles.panel}
        data-open={open ? "true" : "false"}
        data-lenis-prevent
        role="dialog"
        aria-modal={open || undefined}
        aria-hidden={!open}
        aria-labelledby={titleId}
        {...(open ? {} : ({ inert: "" } as HTMLAttributes<HTMLDivElement>))}
      >
        <div className={styles.panelHeader}>
          <h2 id={titleId}>{title}</h2>
          <button
            ref={closeRef}
            type="button"
            className={styles.close}
            aria-label="Schließen"
            onClick={onClose}
          >
            <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M6 6l12 12M18 6L6 18"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
        <div className={styles.panelBody}>
          {members.length > 0 ? (
            <ul className={styles.members}>
              {members.map((member) => (
                <li key={member.id} className={styles.member}>
                  {member.src ? (
                    <img className={styles.memberPortrait} src={member.src} alt="" width={56} height={56} />
                  ) : (
                    <span className={styles.memberFallback} aria-hidden="true">
                      {member.name.slice(0, 1)}
                    </span>
                  )}
                  <span>{member.name}</span>
                </li>
              ))}
            </ul>
          ) : null}
          {text ? <div className={styles.body} dangerouslySetInnerHTML={{ __html: text }} /> : null}
        </div>
      </div>
    </>,
    document.body,
  );
};

export default ServiceSlideIn;
