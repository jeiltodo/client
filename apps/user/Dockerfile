FROM node:18-alpine AS deps
WORKDIR /app 
COPY . .
RUN npm i -g npm
RUN npm i -g yarn
RUN yarn install --frozen-lockfile

FROM node:18-alpine AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules

RUN yarn build --filter=user

FROM node:18-alpine AS runner
WORKDIR /app

COPY --from=builder /app/apps/user/.next ./.next
COPY --from=builder /app/apps/user/public ./public
COPY --from=builder /app/apps/user/package.json ./package.json
COPY --from=builder /app/packages ./packages

EXPOSE 3000
CMD ["yarn", "start"]