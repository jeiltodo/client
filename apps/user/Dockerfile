FROM node:20-alpine AS deps
WORKDIR /app

RUN apk add --no-cache bash curl

RUN npm i -g npm
RUN corepack enable && corepack prepare yarn@stable --activate

COPY package.json yarn.lock ./
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

EXPOSE 3000
CMD ["node", "server.js"]
