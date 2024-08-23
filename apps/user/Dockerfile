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

RUN yarn build --filter=user

FROM node:20-alpine AS runner
WORKDIR /app

COPY --from=builder /app/apps/user/.next/standalone ./
COPY --from=builder /app/apps/user/.next/static ./.next/static
COPY --from=builder /app/apps/user/public ./public
COPY --from=builder /app/packages ./packages
COPY --from=builder /app/apps/user/next.config.js ./next.config.js
COPY --from=builder /app/apps/user/package.json ./packages

EXPOSE 3000
CMD ["node", "apps/user/server.js"]
