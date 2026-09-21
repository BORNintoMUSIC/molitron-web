"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import styles from "./MoasOverview.module.css";

const versions = [
  {
    id: "v2",
    label: "Version 2.0",
    duration: "2 min 3 sec",
    src: "/videos/moas-overview.mp4?v=04",
    poster: "/images/moas/moas-overview-wall-poster-v04.webp",
    captions: "/videos/moas-overview-v04.vtt",
  },
  {
    id: "v3",
    label: "Version 3.0",
    duration: "1 min 52 sec",
    src: "/videos/moas-overview-v3.mp4",
    poster: "/images/moas/moas-overview-v3-poster.webp",
    captions: "/videos/moas-overview-v3.vtt",
  },
] as const;

export function MoasVideoComparison() {
  const [activeIndex, setActiveIndex] = useState(1);
  const videos = useRef<(HTMLVideoElement | null)[]>([]);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  function selectVersion(index: number) {
    if (index === activeIndex) return;
    videos.current.forEach((video) => video?.pause());
    setActiveIndex(index);
  }

  function handleTabKey(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next: number;
    switch (event.key) {
      case "ArrowRight":
        next = (index + 1) % versions.length;
        break;
      case "ArrowLeft":
        next = (index + versions.length - 1) % versions.length;
        break;
      case "Home":
        next = 0;
        break;
      case "End":
        next = versions.length - 1;
        break;
      default:
        return;
    }
    event.preventDefault();
    selectVersion(next);
    tabs.current[next]?.focus();
  }

  return (
    <>
      <p className={styles.comparisonHint}>Choose a version to compare the two walkthroughs.</p>
      <div className={styles.tabs} role="tablist" aria-label="MOAS video versions">
        {versions.map((version, index) => (
          <button
            key={version.id}
            ref={(element) => { tabs.current[index] = element; }}
            id={`moas-video-tab-${version.id}`}
            className={styles.tab}
            type="button"
            role="tab"
            aria-selected={index === activeIndex}
            aria-controls={`moas-video-panel-${version.id}`}
            tabIndex={index === activeIndex ? 0 : -1}
            onClick={() => selectVersion(index)}
            onKeyDown={(event) => handleTabKey(event, index)}
          >
            {version.label}
          </button>
        ))}
      </div>
      {versions.map((version, index) => (
        <div
          key={version.id}
          id={`moas-video-panel-${version.id}`}
          className={styles.panel}
          role="tabpanel"
          aria-labelledby={`moas-video-tab-${version.id}`}
          hidden={index !== activeIndex}
          tabIndex={0}
        >
          <figure className={styles.film}>
            <div className={styles.filmHeader}>
              <span>Inside a MOAS installation / {version.label}</span>
              <span>{version.duration} <span aria-hidden="true">/</span> Video walkthrough</span>
            </div>
            <video
              ref={(element) => { videos.current[index] = element; }}
              className={styles.video}
              controls
              playsInline
              preload="none"
              poster={version.poster}
              width={1920}
              height={1080}
              aria-label={`MOAS video walkthrough — ${version.label}`}
              aria-describedby={`moas-video-caption-${version.id}`}
            >
              <source src={version.src} type="video/mp4" />
              <track src={version.captions} kind="captions" srcLang="en" label="English" />
              <a href={version.src}>Open the MOAS video walkthrough ({version.label})</a>.
            </video>
            <figcaption id={`moas-video-caption-${version.id}`} className={styles.caption}>
              <span>From the kitchen hood to system connections and service access.</span>
              <a href={version.src}>Open {version.label} separately ↗</a>
            </figcaption>
          </figure>
        </div>
      ))}
    </>
  );
}
