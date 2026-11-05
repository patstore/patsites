# Build one workspace app into a Nitro Node server.
# Coolify: base directory /, Dockerfile /Dockerfile, build arg APP=<package name>.
FROM node:24-bookworm-slim AS build

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV COREPACK_ENABLE_DOWNLOAD_PROMPT=0

RUN corepack enable && corepack prepare pnpm@11.25.0 --activate

WORKDIR /app

COPY . .

RUN pnpm install --frozen-lockfile

ARG APP=koloproktologie

# Coolify passes dashboard variables as build args. Vite reads them from the environment.
ARG VITE_PATSTORE_API_URL
ARG VITE_PATSTORE_GRAPHQL_API_URL
ARG VITE_PATSTORE_APP_ID
ARG VITE_PATSTORE_REST_KEY
ARG VITE_PATSTORE_FILE_URL
ARG VITE_PATSTORE_PROJECT_ID
ARG VITE_SESSION_TOKEN

ENV VITE_PATSTORE_API_URL=$VITE_PATSTORE_API_URL \
    VITE_PATSTORE_GRAPHQL_API_URL=$VITE_PATSTORE_GRAPHQL_API_URL \
    VITE_PATSTORE_APP_ID=$VITE_PATSTORE_APP_ID \
    VITE_PATSTORE_REST_KEY=$VITE_PATSTORE_REST_KEY \
    VITE_PATSTORE_FILE_URL=$VITE_PATSTORE_FILE_URL \
    VITE_PATSTORE_PROJECT_ID=$VITE_PATSTORE_PROJECT_ID \
    VITE_SESSION_TOKEN=$VITE_SESSION_TOKEN

RUN pnpm --filter "$APP" build

FROM node:24-bookworm-slim AS runner

ARG APP=koloproktologie

WORKDIR /app

ENV NODE_ENV=production \
    HOST=0.0.0.0 \
    PORT=3000

COPY --from=build /app/apps/${APP}/.output ./.output

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]
