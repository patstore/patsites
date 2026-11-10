/** @jsxImportSource react */
import { useCallback, useMemo, useRef, type CSSProperties, type ReactNode } from "react";
import { ScrollContext } from "./context.ts";
import { EMPTY_SCROLL, type ScrollOrientation, type ScrollSnapshot, type ScrollToOptions } from "./types.ts";
import { useSmoothScroll, type SmoothScrollOptions } from "./useSmoothScroll.ts";
import "lenis/dist/lenis.css";
import "./scroll.css";

export type SmoothScrollProps = {
  children: ReactNode;
  /** Page scroll axis. Vertical is the default. */
  orientation?: ScrollOrientation;
  className?: string;
  style?: CSSProperties;
  contentClassName?: string;
  contentStyle?: CSSProperties;
  options?: SmoothScrollOptions;
};

const viewportStyle = (orientation: ScrollOrientation): CSSProperties => ({
  height: "100dvh",
  width: "100%",
  // 100vw includes the scrollbar and overflows the screen. 100% matches the layout
  // viewport. The native scrollbar stays hidden in scroll.css so it adds no gutter.
  // The scrollport must be able to move. `overflow: hidden` blocks touch scrolling
  // because Lenis does not take over touch unless syncTouch is enabled.
  overflowX: orientation === "horizontal" ? "auto" : "hidden",
  overflowY: orientation === "horizontal" ? "hidden" : "auto",
  WebkitOverflowScrolling: "touch",
  touchAction: orientation === "horizontal" ? "pan-x" : "pan-y",
  scrollBehavior: "auto",
  overscrollBehavior: "contain",
  ...(orientation === "horizontal" ? { whiteSpace: "nowrap" } : null),
});

const contentStyle = (orientation: ScrollOrientation): CSSProperties =>
  orientation === "horizontal"
    ? {
        display: "flex",
        flexDirection: "row",
        height: "100%",
        minWidth: "100%",
        width: "max-content",
      }
    : {
        minHeight: "100%",
        width: "100%",
      };

export function SmoothScroll({
  children,
  orientation = "vertical",
  className,
  style,
  contentClassName,
  contentStyle: contentStyleProp,
  options,
}: SmoothScrollProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const snapshotRef = useRef<ScrollSnapshot>(EMPTY_SCROLL);
  const listenersRef = useRef(new Set<() => void>());

  const onChange = useCallback((snapshot: ScrollSnapshot) => {
    snapshotRef.current = snapshot;
    listenersRef.current.forEach((listener) => listener());
  }, []);

  const { scrollTo } = useSmoothScroll({
    viewportRef,
    contentRef,
    orientation,
    options,
    onChange,
  });

  const context = useMemo(
    () => ({
      subscribe: (listener: () => void) => {
        listenersRef.current.add(listener);
        return () => {
          listenersRef.current.delete(listener);
        };
      },
      getSnapshot: () => snapshotRef.current,
      getServerSnapshot: () => EMPTY_SCROLL,
      scrollTo,
      getViewport: () => viewportRef.current,
      orientation,
    }),
    [orientation, scrollTo],
  );

  return (
    <ScrollContext.Provider value={context}>
      <div
        ref={viewportRef}
        className={className}
        style={{ ...viewportStyle(orientation), ...style }}
        data-scroll-orientation={orientation}
      >
        <div
          ref={contentRef}
          className={contentClassName}
          style={{ ...contentStyle(orientation), ...contentStyleProp }}
        >
          {children}
        </div>
      </div>
    </ScrollContext.Provider>
  );
}
