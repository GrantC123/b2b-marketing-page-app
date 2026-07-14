"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  /** Extra delay in seconds before the reveal starts. */
  delay?: number;
};

/**
 * Slide-up + fade when scrolled into view (Motion / Framer Motion).
 * Respects prefers-reduced-motion.
 */
export function ScrollReveal({
  children,
  className,
  delay = 0,
}: ScrollRevealProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={cn(className)}
      initial={reduceMotion ? false : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2, margin: "0px 0px -8% 0px" }}
      transition={{
        duration: reduceMotion ? 0 : 0.95,
        delay: reduceMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
