"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useCallback, useEffect, useRef } from "react";
import { SriLankaImage } from "@/components/SriLankaImage";
import {
  planToChatHref,
  type SamplePlan,
} from "@/lib/sample-plans";

function PlanCard({ plan, copy }: { plan: SamplePlan; copy: number }) {
  const duplicate = copy === 1;

  return (
    <div className="plan-marquee-card-wrap group/plan">
      <Link
        href={planToChatHref(plan)}
        className="plan-marquee-card shadow-glass"
        tabIndex={duplicate ? -1 : undefined}
        aria-hidden={duplicate ? true : undefined}
        aria-label={`Plan ${plan.title}`}
      >
        <div className="absolute inset-0 z-0 overflow-hidden">
          <SriLankaImage
            image={plan.image}
            fill
            rounded="none"
            className="rounded-none"
            sizes="(max-width: 768px) 85vw, 25vw"
          />
        </div>
        <div aria-hidden className="card-image-scrim">
          <div className="card-image-scrim-blur" />
          <div className="card-image-scrim-fill" />
        </div>
        <div className="card-image-footer-content">
          <span className="inline-block rounded-[12px] bg-white/25 px-3 py-1 text-xs">
            {plan.days}
          </span>
          <h3 className="mt-3 text-xl">{plan.title}</h3>
          <p className="mt-1 text-sm text-white">{plan.route}</p>
          <p className="mt-2 text-xs leading-relaxed text-white/95">{plan.note}</p>
        </div>
        <div className="plan-marquee-card-cta" aria-hidden={duplicate ? true : undefined}>
          <span className="btn-primary pointer-events-none inline-flex items-center gap-2">
            Plan this trip
            <ArrowRight className="h-4 w-4" aria-hidden />
          </span>
        </div>
      </Link>
    </div>
  );
}

function easePlaybackRate(anim: Animation, target: number, onFrame: (id: number) => void) {
  if (target > 0 && anim.playState === "paused") {
    anim.play();
  }

  const step = () => {
    const delta = target - anim.playbackRate;

    if (Math.abs(delta) < 0.025) {
      if (target === 0) {
        anim.playbackRate = 0;
        anim.pause();
      } else {
        anim.playbackRate = 1;
      }
      return;
    }

    anim.playbackRate += delta * 0.14;

    if (target === 0 && anim.playbackRate < 0.04) {
      anim.playbackRate = 0;
      anim.pause();
      return;
    }

    onFrame(requestAnimationFrame(step));
  };

  onFrame(requestAnimationFrame(step));
}

export function SamplePlansMarquee({ plans }: { plans: SamplePlan[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const rampRef = useRef<number | null>(null);

  const cancelRamp = useCallback(() => {
    if (rampRef.current !== null) {
      cancelAnimationFrame(rampRef.current);
      rampRef.current = null;
    }
  }, []);

  const setSpeed = useCallback(
    (target: number) => {
      cancelRamp();
      const anim = trackRef.current?.getAnimations()[0];
      if (!anim) return;

      easePlaybackRate(anim, target, (id) => {
        rampRef.current = id;
      });
    },
    [cancelRamp]
  );

  useEffect(() => cancelRamp, [cancelRamp]);

  return (
    <div
      className="marquee marquee-continuous mt-12"
      onMouseEnter={() => setSpeed(0)}
      onMouseLeave={() => setSpeed(1)}
    >
      <div
        ref={trackRef}
        className="marquee-track !gap-5"
        style={{ animationDuration: "110s" }}
      >
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 gap-5">
            {plans.map((plan) => (
              <PlanCard key={`${copy}-${plan.slug}`} plan={plan} copy={copy} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
