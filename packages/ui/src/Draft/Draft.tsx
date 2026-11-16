import { cloneElement, isValidElement, type ReactElement, type ReactNode } from "react";
import "./draft.css";

type MarkedElement = ReactElement<{ className?: string }>;

function withClass(children: MarkedElement, draft: boolean, className: string) {
  if (!draft || !isValidElement(children)) {
    return children;
  }
  const next = [children.props.className, className].filter(Boolean).join(" ");
  return cloneElement(children, { className: next });
}

export function DraftBorder({
  draft = false,
  children,
}: {
  draft?: boolean;
  children: MarkedElement;
}) {
  return withClass(children, draft, "draft-border");
}

export function DraftLabel({
  draft = false,
  children,
}: {
  draft?: boolean;
  children: MarkedElement;
}) {
  return withClass(children, draft, "draft-label");
}

export function DraftSite({
  draft = false,
  children,
}: {
  draft?: boolean;
  children: MarkedElement;
}) {
  return withClass(children, draft, "draft-site");
}

export function DraftBanner() {
  return <p className="draft-banner">Vorschau Modus</p>;
}

export function DraftGate({
  preview,
  locked = false,
  children,
}: {
  preview: boolean;
  locked?: boolean;
  children: ReactNode;
}) {
  if (locked) {
    return (
      <p className="draft-locked">
        Diese Vorschau ist nur mit einer gültigen Sitzung aus dem CMS erreichbar.
      </p>
    );
  }
  return (
    <>
      {children}
      {preview ? <DraftBanner /> : null}
    </>
  );
}
