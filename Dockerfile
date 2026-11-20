# syntax=docker/dockerfile:1
# Next.js standalone server for philoart.io. See deploy/stack.yml.
FROM node:22-slim AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
# NEXT_PUBLIC_* values are inlined at build time
ARG NEXT_PUBLIC_GRAPHQL_URI
ARG NEXT_PUBLIC_REST_API
ARG NEXT_PUBLIC_SITE_URL
ENV NEXT_PUBLIC_GRAPHQL_URI=${NEXT_PUBLIC_GRAPHQL_URI} \
    NEXT_PUBLIC_REST_API=${NEXT_PUBLIC_REST_API} \
    NEXT_PUBLIC_SITE_URL=${NEXT_PUBLIC_SITE_URL} \
    NEXT_TELEMETRY_DISABLED=1
RUN npm run build

FROM node:22-slim
WORKDIR /app
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0
COPY --from=build --chown=node:node /app/.next/standalone ./
COPY --from=build --chown=node:node /app/.next/static ./.next/static
COPY --from=build --chown=node:node /app/public ./public
# Markdown read from process.cwd() at request time
COPY --from=build --chown=node:node /app/blog ./blog
USER node
EXPOSE 3000
CMD ["node", "server.js"]
