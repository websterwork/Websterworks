/**
 * -----------------------------------------------------------------------------
 * Structured Data Renderer
 * -----------------------------------------------------------------------------
 *
 * Handles injecting JSON-LD Schema.org data into Next.js pages.
 *
 * Responsibilities:
 * • Convert schema objects into JSON-LD script
 * • Support multiple schemas
 * • Safe serialization
 *
 * -----------------------------------------------------------------------------
 */

import type { ReactElement } from "react";

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

type StructuredDataProps = {
    data: Record<string, unknown> | Record<string, unknown>[];
};

/* -------------------------------------------------------------------------- */
/* Component                                                                  */
/* -------------------------------------------------------------------------- */

export function StructuredData ( { data }: StructuredDataProps ): ReactElement
{
    const schemas = Array.isArray( data ) ? data : [ data ];

    return (
        <>
        {
            schemas.map( ( schema, index ) => (
                <script
          key= { index }
          type = "application/ld+json"
          dangerouslySetInnerHTML = {{
                __html: JSON.stringify( schema ),
            }}
        />
      ))
}
</>
  );
}
