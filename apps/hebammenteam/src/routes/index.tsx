import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@components";
import Home from "../content/Home/Home";

export const Route = createFileRoute("/")({
  head: () => ({ meta: seo() }),
  component: Home,
});
