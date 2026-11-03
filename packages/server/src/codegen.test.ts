import assert from "node:assert/strict";
import test from "node:test";
import { rewriteLegacySiteLinks } from "./codegen.ts";

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
