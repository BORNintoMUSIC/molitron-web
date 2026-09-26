import Image from "next/image";
import Link from "next/link";
import { products } from "@/lib/products";
import { productPresentation } from "@/lib/product-presentation";
import { Arrow } from "./Arrow";
import styles from "./ProductOpening.module.css";

export function ProductOpening() {
  return (
    <section className={styles.opening} aria-labelledby="opening-title">
      <div className={styles.inner}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>
            <span aria-hidden="true" /> Commercial kitchen pollution control
          </p>
          <h1 id="opening-title" className={styles.title}>
            Exhaust control.
            <br />
            Built around
            <br />
            <span>your kitchen.</span>
          </h1>
          <p className={styles.intro}>
            Two systems for commercial kitchen exhaust, built by Molitron in
            Colorado. MOAS treats cooking odor. EPFA filters smoke particulate
            and grease vapor from light-duty kitchen exhaust.
          </p>
          <div className={styles.actions}>
            <Link href="#system-explorer" className={styles.primary}>
              See how it works <Arrow />
            </Link>
            <Link href="/contact" className={styles.secondary}>
              Discuss your project <Arrow diagonal />
            </Link>
          </div>
          <p className={styles.signature}>
            <span className={styles.signatureLine} /> A family business.
            <br />
            <strong>Manufacturer direct.</strong>
          </p>
        </div>
        <div className={styles.pair} aria-label="Molitron products">
          {products.map((product, index) => (
            <Link
              key={product.slug}
              href={"/products/" + product.slug}
              className={styles.showcase + " " + styles[product.slug]}
              aria-label={
                "Explore " +
                product.shortName +
                " " +
                productPresentation[product.slug].role
              }
            >
              <span className={styles.showcaseIndex}>
                0{index + 1} / {productPresentation[product.slug].role}
              </span>
              <span className={styles.showcaseWord} aria-hidden="true">
                {product.shortName}
              </span>
              <div className={styles.showcaseImage}>
                <Image
                  src={productPresentation[product.slug].image}
                  alt={product.hero.alt}
                  fill
                  sizes="(max-width: 767px) 90vw, 600px"
                  quality={85}
                  loading="eager"
                  fetchPriority={index === 0 ? "high" : "auto"}
                />
              </div>
              <span className={styles.showcaseName}>{product.shortName}</span>
              <span className={styles.showcaseArrow} aria-hidden="true">
                <Arrow diagonal />
              </span>
            </Link>
          ))}
        </div>
      </div>
      <div className={styles.foundation}>
        <p>
          <span>01</span> Fabricated in Colorado
        </p>
        <p>
          <span>02</span> Projects nationwide
        </p>
        <Link href="/products">
          <span>03</span> Compare MOAS & EPFA <Arrow diagonal />
        </Link>
      </div>
    </section>
  );
}
