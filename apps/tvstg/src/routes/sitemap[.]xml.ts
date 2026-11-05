import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const { buildSitemap } = await import("@server/sitemap.server");
        return new Response(await buildSitemap(request.url), {
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=0, must-revalidate",
          },
        });
      },
    },
  },
});
