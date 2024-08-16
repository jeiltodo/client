FROM node:18-alpine AS deps
WORKDIR /app 
COPY . .
RUN yarn version
RUN yarn install --frozen-lockfile

FROM node:18-alpine AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN yarn build --filter=admin

FROM node:18-alpine AS runner
WORKDIR /app

COPY --from=builder /app/apps/admin/.next ./.next
COPY --from=builder /app/apps/admin/public ./public
COPY --from=builder /app/apps/admin/package.json ./package.json
COPY --from=builder /app/packages ./packages

EXPOSE 3001

CMD ["yarn", "start"]