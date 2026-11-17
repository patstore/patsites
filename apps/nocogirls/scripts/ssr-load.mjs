import { createServer } from "vite";

const server = await createServer({
	server: { middlewareMode: true },
	appType: "custom"
});
try {
	await server.ssrLoadModule("/src/provider/index.ts");
	console.log("loaded");
} catch (error) {
	console.error(error instanceof Error ? error.stack : error);
} finally {
	await server.close();
}
