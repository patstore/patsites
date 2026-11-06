# TV Freiburg St. Georgen

Website of the TV Freiburg St. Georgen 1897 e.V. This app lives in the
patsites monorepo and uses the same TanStack Start, Nitro, and PatStore
setup as the other sites.

Editorial collections and live PatStore reads use the same server fetch.
Set `VITE_DRAFT_MODE=true` to load unpublished records from PatStore.
Leave it unset to read the published build snapshot.

## Development

From the repository root:

```shell
pnpm install
pnpm --filter tvstg dev
```

The dev server listens on http://localhost:3002. Copy `.env.example` to
`.env.development` and fill in the PatStore credentials. Existing
`GATSBY_PATSTORE_*` names are still accepted.

| Script | Purpose |
| --- | --- |
| `pnpm --filter tvstg dev` | Vite dev server with SSR |
| `pnpm --filter tvstg build` | Client bundle and Nitro server |
| `pnpm --filter tvstg preview` | Serve the production build locally |
| `pnpm --filter tvstg check-types` | `tsc --noEmit` |
