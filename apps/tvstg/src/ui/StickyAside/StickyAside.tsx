import React, { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import styles from "./StickyAside.module.css";

type StickMode = "static" | "fixed" | "bottom";

function readHeaderOffset(): number {
  const raw = getComputedStyle(document.documentElement).getPropertyValue("--tvstg-site-header");
  const value = parseFloat(raw);
  return Number.isFinite(value) ? value : 100;
}

function scrollParents(el: HTMLElement): Array<HTMLElement | Window> {
  const nodes: Array<HTMLElement | Window> = [window];
  let node: HTMLElement | null = el.parentElement;
  while (node) {
    const { overflowY } = getComputedStyle(node);
    if (/(auto|scroll|overlay)/.test(overflowY)) {
      nodes.push(node);
    }
    node = node.parentElement;
  }
  return nodes;
}

type StickyAsideProps = {
  children: ReactNode;
  panelClassName?: string;
  trackClassName?: string;
  /** Minimum viewport width where fixed stickiness is enabled. */
  minWidth?: number;
};

const StickyAside: React.FC<StickyAsideProps> = ({
  children,
  panelClassName,
  trackClassName,
  minWidth = 992,
}) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<StickMode>("static");
  const [metrics, setMetrics] = useState({ left: 0, width: 0 });
  const [placeholderHeight, setPlaceholderHeight] = useState(0);

  useEffect(() => {
    const desktop = window.matchMedia(`(min-width: ${minWidth}px)`);
    let raf = 0;

    const update = () => {
      if (!desktop.matches) {
        setMode("static");
        return;
      }

      const track = trackRef.current;
      const panel = panelRef.current;
      if (!track || !panel) {
        return;
      }

      const header = readHeaderOffset();
      const trackRect = track.getBoundingClientRect();
      const panelHeight = panel.offsetHeight;
      setPlaceholderHeight(Math.max(track.offsetHeight, panelHeight));
      const panelBox = Math.min(panelHeight, window.innerHeight - header - 16);

      if (trackRect.top >= header) {
        setMode("static");
        return;
      }

      if (trackRect.bottom <= header + panelBox) {
        setMode("bottom");
        return;
      }

      setMode("fixed");
      setMetrics({ left: trackRect.left, width: trackRect.width });
    };

    const schedule = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    const bindScroll = (targets: Array<HTMLElement | Window>) => {
      for (const target of targets) {
        if (target === window) {
          window.addEventListener("scroll", schedule, { passive: true });
        } else {
          target.addEventListener("scroll", schedule, { passive: true });
        }
      }
    };

    const unbindScroll = (targets: Array<HTMLElement | Window>) => {
      for (const target of targets) {
        if (target === window) {
          window.removeEventListener("scroll", schedule);
        } else {
          target.removeEventListener("scroll", schedule);
        }
      }
    };

    let parents: Array<HTMLElement | Window> = [window];

    const attach = () => {
      if (trackRef.current) {
        parents = scrollParents(trackRef.current);
      }
      bindScroll(parents);
      window.addEventListener("resize", schedule);
      desktop.addEventListener("change", schedule);
      schedule();
    };

    attach();

    const resizeObserver = new ResizeObserver(schedule);
    if (trackRef.current) {
      resizeObserver.observe(trackRef.current);
    }
    if (panelRef.current) {
      resizeObserver.observe(panelRef.current);
    }

    return () => {
      unbindScroll(parents);
      window.removeEventListener("resize", schedule);
      desktop.removeEventListener("change", schedule);
      resizeObserver.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [minWidth]);

  const panelStyle: CSSProperties =
    mode === "fixed"
      ? {
          position: "fixed",
          top: "var(--tvstg-site-header, 100px)",
          left: metrics.left,
          width: metrics.width,
          zIndex: 7,
        }
      : mode === "bottom"
        ? { position: "absolute", bottom: 0, left: 0, width: "100%" }
        : { position: "relative", width: "100%" };

  return (
    <div
      ref={trackRef}
      className={[styles.track, trackClassName].filter(Boolean).join(" ")}
      style={mode !== "static" && placeholderHeight > 0 ? { minHeight: placeholderHeight } : undefined}
    >
      <div
        ref={panelRef}
        style={panelStyle}
        className={[styles.panel, panelClassName].filter(Boolean).join(" ")}
      >
        {children}
      </div>
    </div>
  );
};

export default StickyAside;
