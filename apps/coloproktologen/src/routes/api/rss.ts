import { createFileRoute } from "@tanstack/react-router";
import Parser from "rss-parser";

const parser = new Parser();
const RSS_URL =
    "https://www.springermedizin.de/rss/coloproctology-latest-issue/26502186";

async function fetchRssFeed() {
    try {
        const feed = await parser.parseURL(RSS_URL);
        return Response.json(feed);
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        return Response.json({ error: message }, { status: 500 });
    }
}

export const Route = createFileRoute("/api/rss")({
    server: {
        handlers: {
            GET: fetchRssFeed,
            POST: fetchRssFeed
        }
    }
});
