import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { i18n } from "./i18n";
import { source } from "./source";

/**
 * Shared layout configurations
 *
 * you can customise layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export function baseOptions(locale: string): BaseLayoutProps {
  return {
    i18n,
    nav: {
      title: (
        <>
          <svg
            width="20"
            height="32"
            viewBox="150 100 200 300"
            xmlns="http://www.w3.org/2000/svg"
            className="shrink-0"
          >
            <g transform="translate(0,500) scale(0.1,-0.1)" fill="currentColor">
              <path
                d="M2453 3878 c-37 -42 -806 -1082 -807 -1092 -2 -19 1168 -1277 1175
              -1263 4 6 145 263 313 570 168 307 306 564 306 572 0 13 -843 1157 -893 1213
              -12 12 -32 22 -47 22 -15 0 -36 -10 -47 -22z"
              />
              <path
                d="M1648 2490 c17 -30 209 -379 426 -775 374 -682 397 -720 424 -723 28
              -3 33 3 126 173 54 97 95 182 93 188 -5 11 -1003 1096 -1069 1162 l-30 30 30
              -55z"
              />
            </g>
          </svg>
          Commet
        </>
      ),
    },
    githubUrl: "https://github.com/commet-labs/docs",
    // see https://fumadocs.dev/docs/ui/navigation/links
    links: [],
  };
}
