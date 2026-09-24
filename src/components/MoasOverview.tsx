import { Button } from "./Button";
import { Section } from "./Section";
import styles from "./MoasOverview.module.css";

export function MoasOverview() {
  return (
    <Section id="video-overview" className={styles.section}>
      <div className={styles.heading}>
        <div>
          <p className={styles.eyebrow}>MOAS / The owner’s overview</p>
          <h2>Picture MOAS in your kitchen.</h2>
        </div>
        <p className={styles.intro}>
          Take a guided look at the system, its connections and the details to
          consider when planning odor control for your commercial kitchen.
        </p>
      </div>
      <figure className={styles.film}>
        <div className={styles.filmHeader}>
          <span>Inside a MOAS installation</span>
          <span>1 min 52 sec <span aria-hidden="true">/</span> Video walkthrough</span>
        </div>
        <video
          className={styles.video}
          controls
          playsInline
          preload="none"
          poster="/images/moas/moas-overview-v3-poster.webp"
          width={1920}
          height={1080}
          aria-label="MOAS video walkthrough for commercial kitchen owners"
          aria-describedby="moas-video-caption"
        >
          <source src="/videos/moas-overview-v3.mp4" type="video/mp4" />
          <track src="/videos/moas-overview-v3.vtt" kind="captions" srcLang="en" label="English" />
          <a href="/videos/moas-overview-v3.mp4">Open the MOAS video walkthrough</a>.
        </video>
        <figcaption id="moas-video-caption" className={styles.caption}>
          <span>From the kitchen hood to system connections and service access.</span>
          <a href="/videos/moas-overview-v3.mp4">Open video separately ↗</a>
        </figcaption>
      </figure>
      <div className={styles.nextStep}>
        <div>
          <h3>Let’s talk about your kitchen.</h3>
          <p>Share your cooking equipment, location and exhaust layout with us.</p>
        </div>
        <Button href="/contact?product=moas" variant="secondary">
          Discuss your MOAS installation <span aria-hidden="true">↗</span>
        </Button>
      </div>
    </Section>
  );
}
