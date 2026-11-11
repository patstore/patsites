import { createFileRoute, stripSearchParams, useRouter } from "@tanstack/react-router";
import { z } from "zod";
import { seo } from "@components";
import Berichte from "../../content/Berichte/Berichte";

const berichteSearchSchema = z.object({
  kategorie: z.string().min(1).max(32).optional().catch(undefined),
  seite: z.number().int().min(1).default(1).catch(1),
});

export const Route = createFileRoute("/medien/berichte")({
  validateSearch: berichteSearchSchema,
  search: { middlewares: [stripSearchParams({ seite: 1 })] },
  head: ({ match }) => ({
    meta: seo({
      title: match.search.seite > 1 ? `Berichte – Seite ${match.search.seite}` : "Berichte",
      description: "Aktuelle und vergangene Berichte aus dem Vereinsgeschehen",
    }),
  }),
  component: BerichtePage,
});

function BerichtePage() {
  const { kategorie, seite } = Route.useSearch();
  const navigate = Route.useNavigate();
  const router = useRouter();

  return (
    <Berichte
      kategorie={kategorie}
      seite={seite}
      onCategoryChange={(next) =>
        navigate({ search: { kategorie: next }, resetScroll: false })
      }
      onPageChange={(next) =>
        navigate({ search: (prev) => ({ ...prev, seite: next }) })
      }
      pageHref={(next) =>
        router.buildLocation({
          to: "/medien/berichte",
          search: { kategorie, seite: next },
        }).href
      }
    />
  );
}
