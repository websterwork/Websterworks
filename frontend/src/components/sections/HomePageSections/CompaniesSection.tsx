"use client";

/**
 * -----------------------------------------------------------------------------
 * Companies Section
 * -----------------------------------------------------------------------------
 *
 * Short infinite logo slider for partner / client companies.
 *
 * -----------------------------------------------------------------------------
 */

import Image from "next/image";

import { InfiniteRow } from "@/components/common/InfiniteRow";
import { companiesList } from "@/data/companies";

function logoAlt(logo: string) {
  const file =
    logo
      .split("/")
      .pop()
      ?.replace(/\.[^.]+$/, "") ?? "Company";

  return file.replace(/-/g, " ");
}

export function CompaniesSection() {
  const logos = (
    <div className="flex items-center">
      {companiesList.map((company) => (
        <div
          key={company.logo}
          className="
            flex
            h-10
            shrink-0
            items-center
            px-6
            sm:h-12
            sm:px-10
            md:px-14
          "
        >
          <Image
            src={company.logo}
            alt={logoAlt(company.logo)}
            width={160}
            height={40}
            unoptimized
            className="
              h-6
              w-auto
              max-w-32
              object-contain
              object-left
              opacity-70
              brightness-0
              transition-opacity
              hover:opacity-100
              dark:invert
              sm:h-8
              sm:max-w-40
              md:h-9
            "
          />
        </div>
      ))}
    </div>
  );

  return (
    <section
      className="
        relative
        overflow-hidden
        border-y
        border-border/40
        bg-background
        py-8
        sm:py-10
        md:py-12
      "
      aria-label="Companies"
    >
      <InfiniteRow speed={32} pauseOnHover>
        {logos}
      </InfiniteRow>
    </section>
  );
}
