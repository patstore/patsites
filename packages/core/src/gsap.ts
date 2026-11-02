import { useGSAP } from "@gsap/react";
import gsap from "gsap";

let registered = false;

export function registerGsap(): void {
  if (registered) {
    return;
  }
  gsap.registerPlugin(useGSAP);
  registered = true;
}

export function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}
