import assert from "node:assert/strict";
import test from "node:test";
import { renderPublicContent, rewriteLegacySiteLinks } from "./codegen.ts";
import type { PatStoreModule } from "./types.ts";

test("older article links use the public site domain", () => {
  const snapshot = {
    articles: [
      {
        text: '<a href="https://koloproktologie.netlify.app/documents/drittlaender.pdf">PDF</a>',
      },
      {
        text: '<a href="http://www.koloproktologie.netlify.app/documents/report.pdf">PDF</a>',
      },
    ],
    note: "https://koloproktologie.org/aktivitaeten stays",
  };

  assert.deepEqual(rewriteLegacySiteLinks(snapshot), {
    articles: [
      {
        text: '<a href="https://koloproktologie.org/documents/drittlaender.pdf">PDF</a>',
      },
      {
        text: '<a href="https://koloproktologie.org/documents/report.pdf">PDF</a>',
      },
    ],
    note: "https://koloproktologie.org/aktivitaeten stays",
  });
});

test("the live collection route is limited to snapshot classes", () => {
  const module = (className: string): PatStoreModule => ({
    objectId: className,
    name: className,
    connected_class: className,
    fields: [],
    data_fields: [],
  });
  const source = renderPublicContent([
    module("Event"),
    module("Event"),
    module("Person"),
    module("User"),
    module("Email"),
  ]);

  assert.match(source, /export const publicClassNames = \["Event","Person"\] as const/);
  assert.match(source, /Event: EventClass\[\]/);
  assert.match(source, /mode: "ssr", states: null/);
  assert.doesNotMatch(source, /"Event","Event"/);
});
