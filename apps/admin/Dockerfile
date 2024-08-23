FROM node:20-alpine AS deps
WORKDIR /app

RUN apk add --no-cache bash curl

RUN corepack enable && corepack prepare yarn@stable --activate

COPY . .
RUN yarn install --frozen-lockfile

FROM node:20-alpine AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules

RUN yarn build --filter=admin

FROM node:20-alpine AS runner
WORKDIR /app

COPY --from=builder /app/apps/admin/.next/standalone ./
COPY --from=builder /app/apps/admin/.next/static ./apps/admin/.next/static
COPY --from=builder /app/apps/admin/public ./apps/admin/public
COPY --from=builder /app/apps/admin/next.config.js ./apps/admin/next.config.js
COPY --from=builder /app/packages ./packages
COPY --from=builder /app/apps/admin/package.json ./apps/admin/packages

ENV PORT=3001

EXPOSE 3001
CMD ["node", "apps/admin/server.js"]
