/** @jsxImportSource react */
import { useRef, type CSSProperties } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { prefersReducedMotion, registerGsap } from "../gsap.ts";
import { splitChars, splitLines } from "./split.ts";
import { useInView } from "./useInView.ts";

export type AnimateTextProps = {
  children: string;
  /** `lines` slides each line up. `chars` staggers characters. */
  type?: "lines" | "chars";
  /** `inView` waits for Lenis. `mount` plays immediately. */
  animate?: "inView" | "mount";
  /** When set, replaces the in-view check. `false` reverses the text. */
  trigger?: boolean;
  delay?: number;
  duration?: number;
  ease?: string;
  stagger?: number;
  once?: boolean;
  threshold?: number;
  className?: string;
  style?: CSSProperties;
};

export function AnimateText({
  children,
  type = "lines",
  animate = "inView",
  trigger,
  delay = 0,
  duration = 0.8,
  ease = "power3.out",
  stagger = 0.03,
  once = true,
  threshold = 0.2,
  className,
  style,
}: AnimateTextProps) {
  registerGsap();
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { once, threshold });
  const active = trigger ?? (animate === "mount" ? true : seen);
  const text = children;

  useGSAP(
    () => {
      const element = ref.current;
      if (!element) {
        return;
      }
      const targets = type === "chars" ? splitChars(element, text) : splitLines(element, text);
      const hidden = type === "chars" ? { y: 30, autoAlpha: 0 } : { y: "100%", autoAlpha: 0 };
      const visible = type === "chars" ? { y: 0, autoAlpha: 1 } : { y: "0%", autoAlpha: 1 };
      if (!active || prefersReducedMotion()) {
        gsap.set(targets, prefersReducedMotion() && active ? visible : hidden);
        return;
      }
      gsap.fromTo(targets, hidden, { ...visible, duration, delay, ease, stagger, overwrite: "auto" });
    },
    { scope: ref, dependencies: [text, type, active, duration, delay, ease, stagger] },
  );

  return (
    <div ref={ref} className={className} style={style} suppressHydrationWarning>
      {typeof window === "undefined" ? text : null}
    </div>
  );
}
