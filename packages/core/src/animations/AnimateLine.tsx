/** @jsxImportSource react */
import { useRef, type CSSProperties } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { prefersReducedMotion, registerGsap } from "../gsap.ts";
import { useInView } from "./useInView.ts";

export type AnimateLineDirection = "top-to-bottom" | "left-to-right" | "right-to-left";

export type AnimateLineProps = {
  length: number;
  thickness?: number | string;
  direction?: AnimateLineDirection;
  /** `inView` waits for Lenis. `mount` plays immediately. */
  animate?: "inView" | "mount";
  trigger?: boolean;
  delay?: number;
  duration?: number;
  ease?: string;
  unit?: "px" | "%";
  color?: string;
  once?: boolean;
  threshold?: number;
  className?: string;
  style?: CSSProperties;
  id?: string;
};

export function AnimateLine({
  length,
  thickness = 1,
  direction = "top-to-bottom",
  animate = "inView",
  trigger,
  delay = 0,
  duration = 0.8,
  ease = "power3.out",
  unit = "px",
  color = "currentColor",
  once = true,
  threshold = 0.2,
  className,
  style,
  id,
}: AnimateLineProps) {
  registerGsap();
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { once, threshold });
  const active = trigger ?? (animate === "mount" ? true : seen);
  const vertical = direction === "top-to-bottom";
  const size: CSSProperties = vertical
    ? { height: `${length}${unit}`, width: thickness }
    : { width: `${length}${unit}`, height: thickness };
  const origin =
    direction === "right-to-left" ? "right center" : vertical ? "top center" : "left center";
  const axis = vertical ? "scaleY" : "scaleX";

  useGSAP(
    () => {
      if (!ref.current) {
        return;
      }
      gsap.set(ref.current, { [axis]: 0, transformOrigin: origin });
    },
    { scope: ref, dependencies: [axis, origin] },
  );

  useGSAP(
    () => {
      if (!ref.current || !active) {
        return;
      }
      if (prefersReducedMotion()) {
        gsap.set(ref.current, { [axis]: 1, transformOrigin: origin });
        return;
      }
      gsap.to(ref.current, { [axis]: 1, transformOrigin: origin, duration, delay, ease, overwrite: "auto" });
    },
    { scope: ref, dependencies: [active, axis, origin, duration, delay, ease] },
  );

  return (
    <div
      id={id}
      ref={ref}
      aria-hidden="true"
      className={className}
      style={{ background: color, ...size, ...style }}
    />
  );
}
