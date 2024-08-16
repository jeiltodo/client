# Stage 1: Install dependencies
FROM node:20-alpine AS deps
WORKDIR /app
COPY . .
RUN npm i -g npm
RUN npm i -g yarn
RUN yarn install --frozen-lockfile

# Stage 2: Build the project
FROM node:20-alpine AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN yarn build --filter=admin

# Stage 3: Prepare the final image
FROM node:20-alpine AS runner
WORKDIR /app

COPY --from=builder /app/apps/admin/.next ./.next
COPY --from=builder /app/apps/admin/public ./public
COPY --from=builder /app/apps/admin/package.json ./package.json
COPY --from=builder /app/packages ./packages

EXPOSE 3001

CMD ["yarn", "start"]
