"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { animate, motion, useReducedMotion } from "framer-motion";

/**
 * The hero's signature moment: a YOLO-style detection box locks onto the
 * avatar once on page load, the same way the UAV tracker locks onto a target.
 */
export function Viewfinder({ label, status }: { label: string; status: string }) {
  const reduce = useReducedMotion();
  const [conf, setConf] = useState(reduce ? 0.98 : 0);

  useEffect(() => {
    if (reduce) return;
    const controls = animate(0, 0.98, {
      duration: 1.1,
      delay: 0.5,
      ease: [0.2, 0, 0, 1],
      onUpdate: setConf,
    });
    return () => controls.stop();
  }, [reduce]);

  const locked = conf >= 0.98;

  return (
    <div className="relative mx-auto w-full max-w-[26rem]">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] border border-line bg-surface">
        <div className="scanlines absolute inset-0" aria-hidden="true" />
        {/* crosshair grid */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              "linear-gradient(to right, var(--line) 1px, transparent 1px), linear-gradient(to bottom, var(--line) 1px, transparent 1px)",
            backgroundSize: "25% 20%",
          }}
        />
        <Image
          src="/images/avatar-cartoon.png"
          alt="Illustrated portrait of Umut at a laptop"
          width={549}
          height={623}
          priority
          sizes="(min-width: 768px) 26rem, 90vw"
          className="absolute bottom-0 left-1/2 w-[86%] -translate-x-1/2"
        />

        {/* detection box */}
        <motion.div
          aria-hidden="true"
          className="absolute"
          initial={
            reduce
              ? false
              : { top: "4%", left: "4%", right: "4%", bottom: "4%", opacity: 0.4 }
          }
          animate={{ top: "14%", left: "20%", right: "20%", bottom: "38%", opacity: 1 }}
          transition={{ duration: 1.1, delay: 0.5, ease: [0.2, 0, 0, 1] }}
        >
          <span className="corner tl" />
          <span className="corner tr" />
          <span className="corner bl" />
          <span className="corner br" />
          <motion.span
            className="absolute inset-0 border border-hud"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: locked ? 0.55 : 0 }}
            transition={{ duration: 0.25 }}
          />
          <span className="absolute -top-8 left-0 whitespace-nowrap rounded-sm bg-hud px-2 py-1 font-mono text-[0.72rem] font-medium text-accent-ink">
            {label} {conf.toFixed(2)}
          </span>
        </motion.div>

        <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-md bg-bg/80 px-2.5 py-1.5 font-mono text-[0.7rem] text-hud backdrop-blur">
          <span
            className={`size-1.5 rounded-full bg-hud ${locked ? "pulse-dot" : "opacity-40"}`}
            aria-hidden="true"
          />
          {status}
        </div>
      </div>
    </div>
  );
}
