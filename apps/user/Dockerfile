FROM node:20-alpine AS deps
WORKDIR /app

RUN apk add --no-cache bash curl

RUN npm i -g npm
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

COPY --from=builder /app/apps/user/.next ./.next
COPY --from=builder /app/apps/user/package.json ./package.json
COPY --from=builder /app/packages ./packages
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000
CMD ["yarn", "start"]