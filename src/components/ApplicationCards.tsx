import Image from "next/image";
import Link from "next/link";
import { Arrow } from "./home/Arrow";
import { applications } from "@/lib/applications";

export function ApplicationCards() {
  return (
    <div className="application-grid">
      {applications.map((application) => (
        <Link
          key={application.href}
          href={application.href}
          className="application-card"
        >
          <div className="application-image">
            <Image
              src={application.image}
              alt={application.alt}
              fill
              quality={75}
              sizes="(max-width: 767px) 90vw, 580px"
            />
          </div>
          <div className="application-copy">
            <div>
              <h3>{application.title}</h3>
              <Arrow diagonal />
            </div>
            <p>{application.description}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
