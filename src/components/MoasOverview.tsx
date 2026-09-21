import { Button } from "./Button";
import { Section } from "./Section";
import { MoasVideoComparison } from "./MoasVideoComparison";
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
      <MoasVideoComparison />
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
