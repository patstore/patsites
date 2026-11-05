import { createFileRoute, stripSearchParams, useRouter } from "@tanstack/react-router";
import { z } from "zod";
import { getArticlePage } from "@functions/articles.functions";
import { seo } from "@components";
import { PatstoreScope } from "@provider";
import Berichte from "../../content/Berichte/Berichte";

const berichteSearchSchema = z.object({
  kategorie: z.string().min(1).max(32).optional().catch(undefined),
  seite: z.number().int().min(1).default(1).catch(1),
});

export const Route = createFileRoute("/medien/berichte")({
  validateSearch: berichteSearchSchema,
  search: { middlewares: [stripSearchParams({ seite: 1 })] },
  loaderDeps: ({ search }) => ({ kategorie: search.kategorie, seite: search.seite }),
  loader: ({ deps }) => getArticlePage({ data: deps }),
  head: ({ loaderData }) => ({
    meta: seo({
      title:
        loaderData && loaderData.page > 1
          ? `Berichte – Seite ${loaderData.page}`
          : "Berichte",
      description: "Aktuelle und vergangene Berichte aus dem Vereinsgeschehen",
    }),
  }),
  component: BerichtePage,
});

function BerichtePage() {
  const { patstore, page, pageCount } = Route.useLoaderData();
  const { kategorie } = Route.useSearch();
  const navigate = Route.useNavigate();
  const router = useRouter();

  return (
    <PatstoreScope data={patstore}>
      <Berichte
        kategorie={kategorie}
        seite={page}
        pageCount={pageCount}
        onCategoryChange={(next) =>
          navigate({ search: { kategorie: next }, resetScroll: false })
        }
        onPageChange={(seite) =>
          navigate({ search: (prev) => ({ ...prev, seite }) })
        }
        pageHref={(seite) =>
          router.buildLocation({
            to: "/medien/berichte",
            search: { kategorie, seite },
          }).href
        }
      />
    </PatstoreScope>
  );
}
