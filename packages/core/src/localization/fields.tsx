/** @jsxImportSource react */
import {
  Children,
  cloneElement,
  isValidElement,
  useContext,
  type CSSProperties,
  type ImgHTMLAttributes,
  type ReactElement,
  type ReactNode,
} from "react";
import { findValueForKey, isDirectMediaSrc } from "./values.ts";
import { ContentContext, RowValuesContext, SectionPathContext } from "./content-context.ts";

export type SectionProps = {
  /** Literal segment. The scanner joins nested ids into a dot path. */
  id: string;
  /** Editor label. Read from source at build time. */
  label?: string;
  /** Section kind stored in the manifest. Defaults to `section`. */
  type?: string;
  children?: ReactNode;
};

export function Section({ id, children }: SectionProps) {
  const parent = useContext(SectionPathContext);
  const path = parent ? `${parent}.${id}` : id;
  return <SectionPathContext.Provider value={path}>{children}</SectionPathContext.Provider>;
}

function useFieldValue(id: string): unknown {
  const row = useContext(RowValuesContext);
  const sectionPath = useContext(SectionPathContext);
  const { pageData, language } = useContext(ContentContext);
  if (row) {
    return row[id];
  }
  return findValueForKey({
    key: sectionPath ? `${sectionPath}.${id}` : id,
    lang: language,
    content: pageData,
  });
}

export type FieldProps = {
  id: string;
  label?: string;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
};

export function Field({ id, className, style, children }: FieldProps) {
  const value = useFieldValue(id);
  const content = typeof value === "string" ? value : children;
  if (!className && !style) {
    return <>{content}</>;
  }
  return (
    <span className={className} style={style}>
      {content}
    </span>
  );
}

export type ImageFieldProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> & {
  id: string;
  label?: string;
  src?: string;
};

export function ImageField({ id, label: _label, src, alt = "", ...props }: ImageFieldProps) {
  const value = useFieldValue(id);
  const { resolveImage } = useContext(ContentContext);
  const stored = typeof value === "string" && value ? value : undefined;
  const direct = stored && isDirectMediaSrc(stored) ? stored : undefined;
  const resolved = stored && !direct ? resolveImage?.(stored) : undefined;
  const finalSrc = direct ?? resolved ?? src;
  if (!finalSrc) {
    return null;
  }
  return <img {...props} alt={alt} src={finalSrc} />;
}

type LinkValue = { text?: string; href?: string };

function isLinkValue(value: unknown): value is LinkValue {
  return value !== null && typeof value === "object" && ("href" in value || "text" in value);
}

export type LinkFieldProps = {
  id: string;
  label?: string;
  href?: string;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
};

export function LinkField({ id, href, className, style, children }: LinkFieldProps) {
  const value = useFieldValue(id);
  const resolved = isLinkValue(value) ? value : undefined;
  const finalHref = resolved?.href || href;
  if (!finalHref) {
    return <>{children}</>;
  }
  const external = /^https?:\/\//i.test(finalHref);
  return (
    <a
      className={className}
      style={style}
      href={finalHref}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
    >
      {typeof resolved?.text === "string" && resolved.text ? resolved.text : children}
    </a>
  );
}

export type RichTextFieldProps = {
  id: string;
  label?: string;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
};

export function RichTextField({ id, className, style, children }: RichTextFieldProps) {
  const value = useFieldValue(id);
  if (typeof value === "string") {
    return <div className={className} style={style} dangerouslySetInnerHTML={{ __html: value }} />;
  }
  return (
    <div className={className} style={style}>
      {children}
    </div>
  );
}

export type DownloadFieldProps = {
  id: string;
  label?: string;
  href?: string;
  filename?: string;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  displayFileName?: boolean;
};

export function DownloadField({
  id,
  href,
  filename,
  className,
  style,
  children,
  displayFileName = false,
}: DownloadFieldProps) {
  const value = useFieldValue(id);
  const { resolveFile } = useContext(ContentContext);
  const stored = typeof value === "string" && value ? value : undefined;
  const direct = stored && isDirectMediaSrc(stored) ? { url: stored, filename } : undefined;
  const resolved = stored && !direct ? resolveFile?.(stored) : direct;
  const finalHref = resolved?.url ?? href;
  const downloadName = resolved?.filename || filename || "";
  return (
    <a className={className} style={style} href={finalHref} download={downloadName}>
      {displayFileName ? downloadName : children}
    </a>
  );
}

export type CollectionFieldProps = {
  id: string;
  label?: string;
  children?: ReactNode;
};

function cloneTree(node: ReactNode): ReactNode {
  if (Array.isArray(node)) {
    return node.map((child) => cloneTree(child));
  }
  if (!isValidElement(node)) {
    return node;
  }
  const element = node as ReactElement<{ children?: ReactNode }>;
  const child = element.props.children;
  return cloneElement(element, undefined, child == null ? child : cloneTree(child));
}

export function CollectionField({ id, children }: CollectionFieldProps) {
  const sectionPath = useContext(SectionPathContext);
  const { pageData, language } = useContext(ContentContext);
  const value = findValueForKey({
    key: sectionPath ? `${sectionPath}.${id}` : id,
    lang: language,
    content: pageData,
  });

  if (!Array.isArray(value)) {
    return <>{children}</>;
  }

  return (
    <>
      {value.map((item, index) => (
        <RowValuesContext.Provider
          key={index}
          value={item && typeof item === "object" ? (item as Record<string, unknown>) : {}}
        >
          {Children.count(children) > 0 ? cloneTree(children) : children}
        </RowValuesContext.Provider>
      ))}
    </>
  );
}
