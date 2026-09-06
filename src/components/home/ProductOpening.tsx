import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { Arrow } from "./Arrow";
import styles from "./ProductOpening.module.css";

export function ProductOpening() {
  return (
    <section className={styles.opening} aria-labelledby="opening-title">
      <div className={styles.inner}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}><span aria-hidden="true" /> Colorado built. Since {site.founded}.</p>
          <h1 id="opening-title" className={styles.title}>
            Exhaust control.<br />Built around<br /><span>your kitchen.</span>
          </h1>
          <p className={styles.intro}>
            Filtration and odor abatement for commercial kitchens.
            Purposeful equipment. A direct conversation with the people who build it.
          </p>
          <div className={styles.actions}>
            <a className={styles.primary} href="#inside-moas">See how it works <Arrow /></a>
            <Link className={styles.secondary} href="/contact">Discuss your project <Arrow diagonal /></Link>
          </div>
          <div className={styles.signature}>
            <span className={styles.signatureLine} aria-hidden="true" />
            <p>Independent expertise.<br /><strong>Direct from Molitron.</strong></p>
          </div>
        </div>

        <div className={styles.visual}>
          <div className={styles.stageTop}>
            <span>ODOR ABATEMENT</span>
            <span className={styles.stageIndex}>MOAS</span>
          </div>
          <span className={styles.backdropWord} aria-hidden="true">MOAS</span>
          <div className={styles.productImage}>
            <Image
              src="/images/moas/moas-closed-professional-gpt2.png"
              alt="Molitron MOAS wall-mounted stainless-steel odor abatement cabinet"
              fill
              sizes="(max-width: 767px) 88vw, (max-width: 1279px) 48vw, 620px"
              quality={85}
              loading="eager"
              fetchPriority="high"
              className={styles.equipment}
            />
          </div>
          <div className={styles.productCaption}>
            <div><p>MOAS</p><span>Molitron Odor Abatement System</span></div>
            <a href="#inside-moas" className={styles.explore} aria-label="Explore how MOAS works"><Arrow diagonal /></a>
          </div>
        </div>
      </div>
      <div className={styles.foundation}>
        <p><span>01</span> Fabricated in Colorado</p>
        <p><span>02</span> Nationwide project history</p>
        <Link href="/products"><span>03</span> Two systems. Distinct roles. <Arrow /></Link>
      </div>
    </section>
  );
}
