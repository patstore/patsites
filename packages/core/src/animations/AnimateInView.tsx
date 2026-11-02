/** @jsxImportSource react */
import { useRef, type CSSProperties, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { prefersReducedMotion, registerGsap } from "../gsap.ts";
import { useInView } from "./useInView.ts";
import type { TransitionMotion } from "../transitions/types.ts";

export type AnimateInViewProps = {
  children: ReactNode;
  from?: TransitionMotion;
  to?: TransitionMotion;
  duration?: number;
  delay?: number;
  ease?: string;
  once?: boolean;
  threshold?: number;
  margin?: number;
  className?: string;
  style?: CSSProperties;
};

const hidden: TransitionMotion = { y: 24, autoAlpha: 0 };
const shown: TransitionMotion = { y: 0, autoAlpha: 1 };

export function AnimateInView({
  children,
  from = hidden,
  to = shown,
  duration = 0.8,
  delay = 0,
  ease = "power3.out",
  once = true,
  threshold = 0.2,
  margin = 0,
  className,
  style,
}: AnimateInViewProps) {
  registerGsap();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, threshold, margin });

  useGSAP(
    () => {
      if (!ref.current) {
        return;
      }
      gsap.set(ref.current, from);
    },
    { scope: ref },
  );

  useGSAP(
    () => {
      if (!ref.current || !inView) {
        return;
      }
      if (prefersReducedMotion()) {
        gsap.set(ref.current, to);
        return;
      }
      gsap.to(ref.current, { ...to, duration, delay, ease, overwrite: "auto" });
    },
    { scope: ref, dependencies: [inView, duration, delay, ease] },
  );

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
