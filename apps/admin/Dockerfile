FROM node:18-alpine AS deps
WORKDIR /app 
COPY package.json yarn.lock ./
COPY apps/admin/package.json ./apps/admin/
COPY packages/*/package.json ./packages/*/
RUN yarn install --frozen-lockfile --production

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

EXPOSE 3000
CMD ["yarn", "start"]