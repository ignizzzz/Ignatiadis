"use client";

import { motion, useReducedMotion } from "framer-motion";
import BrandedBadge from "@/components/BrandedBadge";
import Button from "@/components/Button";
import HeroBite from "@/components/home/HeroBite";

export default function Hero() {
  const reduceMotion = useReducedMotion();

  const rise = (delay: number) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 26 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay, ease: [0.22, 0.65, 0.3, 0.9] as const },
        };

  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 pb-14 pt-10 sm:pb-20 sm:pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-6">
        {/* Copy */}
        <div className="relative z-10 text-center lg:text-left">
          <motion.p {...rise(0)} className="font-hand text-2xl sm:text-3xl text-coral">
            Modern Greek snacking, made in London
          </motion.p>

          <motion.h1
            {...rise(0.08)}
            className="mt-3 font-display font-extrabold uppercase leading-[0.92] tracking-tight text-blue text-[clamp(2.9rem,10vw,6.5rem)]"
          >
            Crunch
            <br />
            outside.
            <br />
            <span className="text-coral">Ooze inside.</span>
          </motion.h1>

          <motion.p
            {...rise(0.16)}
            className="mx-auto mt-6 max-w-md text-lg sm:text-xl leading-relaxed text-blue-ink/80 lg:mx-0"
          >
            Crispy phyllo. Creamy feta.{" "}
            <span className="honey-underline font-semibold">Real Greek honey.</span>
          </motion.p>

          <motion.div
            {...rise(0.24)}
            className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:justify-start sm:justify-center"
          >
            <Button href="/order" variant="honey" size="lg" className="w-full sm:w-auto">
              Order FETA POP
            </Button>
            <Button href="/menu" variant="outline" size="lg" className="w-full sm:w-auto">
              Explore the menu
            </Button>
          </motion.div>

          <motion.div
            {...rise(0.34)}
            className="mt-8 flex flex-wrap items-center justify-center gap-2 lg:justify-start"
          >
            <BrandedBadge tone="cream">Made fresh daily</BrandedBadge>
            <BrandedBadge tone="cream">Real Greek feta</BrandedBadge>
            <BrandedBadge tone="cream">Vegetarian friendly</BrandedBadge>
          </motion.div>
        </div>

        {/* Visual */}
        <motion.div
          initial={reduceMotion ? undefined : { opacity: 0, scale: 0.94 }}
          animate={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          className="relative mx-auto w-full max-w-[26rem] sm:max-w-[30rem] lg:max-w-none"
        >
          <HeroBite className="w-full" />

          <BrandedBadge
            tone="coral"
            tilt={-6}
            className="absolute left-1 top-[18%] sm:left-2 shadow-lift"
          >
            Honey meets feta
          </BrandedBadge>
          <BrandedBadge
            tone="blue"
            tilt={4}
            className="absolute bottom-[14%] right-0 sm:right-2 shadow-lift"
          >
            Small bite. Big flavour.
          </BrandedBadge>
        </motion.div>
      </div>
    </section>
  );
}
