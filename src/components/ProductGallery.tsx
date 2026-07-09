"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import type { ProductImage } from "@/lib/products";

function hapticTap() {
  try {
    if (typeof navigator !== "undefined" && typeof navigator.vibrate === "function") {
      navigator.vibrate(15);
    }
  } catch {
    /* iOS often unsupported */
  }
}

/**
 * Gallery that works on mobile WITHOUT relying on React onClick for thumbs.
 *
 * How selection works:
 * - Each thumb is a <label htmlFor="radio-id">
 * - Each radio is a native <input type="radio">
 * - CSS :checked shows the matching large image
 * This is the same mechanism as HTML forms — reliable on iOS Safari.
 *
 * Swipe / arrows programmatically check the next/previous radio.
 */
export function ProductGallery({
  images,
  productName,
}: {
  images: ProductImage[];
  productName: string;
}) {
  const reactId = useId().replace(/:/g, "");
  const groupName = `gallery-${productName}-${reactId}`;
  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const count = images.length;

  // CSS rules: which radio shows which image / thumb highlight
  const dynamicCss = useMemo(() => {
    if (count === 0) return "";
    return images
      .map((_, i) => {
        const id = `${groupName}-${i}`;
        const n = i + 1;
        return `
#${id}:checked ~ .pg-stage .pg-slide { display: none !important; }
#${id}:checked ~ .pg-stage .pg-slide:nth-child(${n}) { display: flex !important; }
#${id}:checked ~ .pg-thumbs .pg-thumb:nth-child(${n}) {
  border-color: #1a6b7a !important;
  box-shadow: 0 0 0 2px rgba(26, 107, 122, 0.35);
}
`;
      })
      .join("\n");
  }, [count, groupName, images]);

  function readCheckedIndex(): number {
    const root = rootRef.current;
    if (!root) return 0;
    const checked = root.querySelector<HTMLInputElement>(
      `input[name="${groupName}"]:checked`,
    );
    if (!checked) return 0;
    const i = Number(checked.dataset.index);
    return Number.isFinite(i) ? i : 0;
  }

  function checkIndex(i: number, withHaptic = true) {
    const root = rootRef.current;
    if (!root || count === 0) return;
    const next = ((i % count) + count) % count;
    const input = root.querySelector<HTMLInputElement>(
      `input[name="${groupName}"][data-index="${next}"]`,
    );
    if (!input) return;
    input.checked = true;
    setActive(next);
    if (withHaptic) hapticTap();
  }

  // Keep counter in sync when user taps a thumb label (native radio change)
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const onChange = (e: Event) => {
      const t = e.target as HTMLInputElement | null;
      if (!t || t.name !== groupName) return;
      const i = Number(t.dataset.index);
      if (!Number.isFinite(i)) return;
      setActive(i);
      // Only haptic for real user input (label tap), not programmatic checks
      if (e.isTrusted) hapticTap();
    };

    root.addEventListener("change", onChange);
    return () => root.removeEventListener("change", onChange);
  }, [groupName]);

  // Swipe on large image — touch only (pointer+touch together cancelled swipes)
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || count < 2) return;

    let startX = 0;
    let startY = 0;
    let tracking = false;

    const onStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      if ((e.target as HTMLElement | null)?.closest?.(".pg-nav")) return;
      tracking = true;
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    };

    const onEnd = (e: TouchEvent) => {
      if (!tracking) return;
      tracking = false;
      const t = e.changedTouches[0];
      if (!t) return;
      const dx = t.clientX - startX;
      const dy = t.clientY - startY;
      if (Math.abs(dx) < 40) return;
      if (Math.abs(dx) < Math.abs(dy)) return;
      const current = readCheckedIndex();
      if (dx < 0) checkIndex(current + 1, true);
      else checkIndex(current - 1, true);
    };

    const onCancel = () => {
      tracking = false;
    };

    stage.addEventListener("touchstart", onStart, { passive: true });
    stage.addEventListener("touchend", onEnd, { passive: true });
    stage.addEventListener("touchcancel", onCancel, { passive: true });

    return () => {
      stage.removeEventListener("touchstart", onStart);
      stage.removeEventListener("touchend", onEnd);
      stage.removeEventListener("touchcancel", onCancel);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, groupName]);

  if (count === 0) return null;

  return (
    <div className="pg" ref={rootRef}>
      <style dangerouslySetInnerHTML={{ __html: dynamicCss }} />

      {/* Radios first so ~ sibling CSS can target stage + thumbs */}
      {images.map((_, i) => (
        <input
          key={`radio-${i}`}
          id={`${groupName}-${i}`}
          className="pg-radio"
          type="radio"
          name={groupName}
          data-index={i}
          defaultChecked={i === 0}
          aria-label={`${productName} photo ${i + 1}`}
        />
      ))}

      {/* Large preview — CSS :checked shows the active slide */}
      <div className="pg-stage" ref={stageRef}>
        {images.map((img, i) => (
          <div key={`slide-${i}`} className="pg-slide" data-slide={i}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img.src}
              alt={img.alt || `${productName} photo ${i + 1}`}
              width={1200}
              height={900}
              draggable={false}
              decoding="async"
              loading={i === 0 ? "eager" : "lazy"}
              className="pg-image"
            />
          </div>
        ))}

        {count > 1 ? (
          <>
            <button
              type="button"
              className="pg-nav pg-nav-prev"
              aria-label="Previous photo"
              onClick={() => checkIndex(readCheckedIndex() - 1, true)}
            >
              ‹
            </button>
            <button
              type="button"
              className="pg-nav pg-nav-next"
              aria-label="Next photo"
              onClick={() => checkIndex(readCheckedIndex() + 1, true)}
            >
              ›
            </button>
            <div className="pg-counter" aria-live="polite">
              {active + 1} / {count}
            </div>
          </>
        ) : null}
      </div>

      {/* Thumbs = labels that toggle radios (works without React click) */}
      {count > 1 ? (
        <div className="pg-thumbs">
          {images.map((img, i) => (
            <label
              key={`thumb-${i}`}
              htmlFor={`${groupName}-${i}`}
              className="pg-thumb"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.src}
                alt=""
                width={96}
                height={96}
                draggable={false}
                decoding="async"
                loading="lazy"
              />
            </label>
          ))}
        </div>
      ) : null}
    </div>
  );
}
