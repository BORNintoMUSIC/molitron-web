"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import type { ProductImage } from "@/lib/products";

export function ProductGallery({
  images,
  productName,
}: {
  images: ProductImage[];
  productName: string;
}) {
  const [active, setActive] = useState(0);
  const [zoomOpen, setZoomOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const descriptionId = useId();
  const count = images.length;
  const current = images[active];

  function select(index: number) {
    setActive(((index % count) + count) % count);
  }

  function closeZoom(returnFocus = false) {
    setZoomOpen(false);
    if (returnFocus) window.setTimeout(() => triggerRef.current?.focus(), 0);
  }

  useEffect(() => {
    if (!zoomOpen) return;
    closeRef.current?.focus();
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setZoomOpen(false);
        window.setTimeout(() => triggerRef.current?.focus(), 0);
      }
      if (event.key === "ArrowLeft") setActive((index) => ((index - 1) % count + count) % count);
      if (event.key === "ArrowRight") setActive((index) => (index + 1) % count);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [count, zoomOpen]);

  if (!current) return null;

  return (
    <div className="min-w-0">
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-border bg-card shadow-sm">
        <button
          ref={triggerRef}
          type="button"
          className="absolute inset-0 z-[1] cursor-zoom-in"
          aria-describedby={descriptionId}
          onClick={() => setZoomOpen(true)}
        >
          <span className="sr-only">Open high-resolution view of {current.alt}</span>
        </button>
        <Image
          key={current.src}
          src={current.src}
          alt={current.alt}
          fill
          priority={active === 0}
          quality={85}
          className="object-contain p-4 sm:p-6"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
        {count > 1 ? (
          <>
            <button
              type="button"
              className="absolute left-3 top-1/2 z-[2] inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-md border border-border bg-card/95 text-xl text-primary shadow-md hover:bg-accent-soft"
              aria-label="Previous photo"
              onClick={() => select(active - 1)}
            >
              ‹
            </button>
            <button
              type="button"
              className="absolute right-3 top-1/2 z-[2] inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-md border border-border bg-card/95 text-xl text-primary shadow-md hover:bg-accent-soft"
              aria-label="Next photo"
              onClick={() => select(active + 1)}
            >
              ›
            </button>
          </>
        ) : null}
        <span className="absolute bottom-3 left-3 z-[2] rounded-md bg-brand px-2.5 py-1 text-xs font-bold text-on-brand">
          {active + 1} / {count}
        </span>
        <span className="absolute bottom-3 right-3 z-[2] rounded-md border border-border bg-card/95 px-2.5 py-1 text-xs font-bold text-primary">
          Inspect image
        </span>
      </div>

      <p id={descriptionId} className="mt-3 text-sm leading-relaxed text-muted">
        {current.alt}
      </p>

      {count > 1 ? (
        <div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-6 lg:grid-cols-7" aria-label={`${productName} photo selection`}>
          {images.map((image, index) => (
            <button
              key={image.src}
              type="button"
              className={`relative aspect-square overflow-hidden rounded-md border-2 bg-card transition-colors ${
                index === active ? "border-accent" : "border-border hover:border-accent/60"
              }`}
              aria-label={`Show ${image.alt}`}
              aria-current={index === active ? "true" : undefined}
              onClick={() => setActive(index)}
            >
              <Image src={image.src} alt="" fill className="object-contain p-1" sizes="96px" />
            </button>
          ))}
        </div>
      ) : null}

      {zoomOpen ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${productName} high-resolution image`}
          className="fixed inset-0 z-[300] flex items-center justify-center bg-slate-950/90 p-3 sm:p-6"
        >
          <button
            type="button"
            className="absolute inset-0 h-full w-full cursor-zoom-out"
            aria-label="Close high-resolution view"
            onClick={() => closeZoom(true)}
          />
          <div className="relative z-[1] h-[min(82vh,60rem)] w-[min(92vw,86rem)] rounded-xl border border-white/20 bg-white">
            <Image
              key={`zoom-${current.src}`}
              src={current.src}
              alt={current.alt}
              fill
              quality={92}
              className="object-contain p-3 sm:p-6"
              sizes="92vw"
            />
            <button
              ref={closeRef}
              type="button"
              className="absolute right-3 top-3 inline-flex h-11 w-11 items-center justify-center rounded-md bg-brand text-xl text-on-brand shadow-lg"
              aria-label="Close high-resolution view"
              onClick={() => closeZoom(true)}
            >
              ×
            </button>
            {count > 1 ? (
              <div className="absolute inset-x-3 bottom-3 flex items-center justify-between">
                <button type="button" className="min-h-11 rounded-md bg-brand px-4 font-bold text-on-brand" onClick={() => select(active - 1)}>
                  Previous
                </button>
                <span className="rounded-md bg-brand px-3 py-2 text-sm font-bold text-on-brand">{active + 1} / {count}</span>
                <button type="button" className="min-h-11 rounded-md bg-brand px-4 font-bold text-on-brand" onClick={() => select(active + 1)}>
                  Next
                </button>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
