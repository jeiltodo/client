# Stage 1: Install dependencies
FROM node:20-alpine AS deps
WORKDIR /app

# Install dependencies required for yarn
RUN apk add --no-cache bash curl

# Install npm and yarn globally
RUN npm i -g npm
RUN corepack enable && corepack prepare yarn@stable --activate

COPY . .
RUN yarn install --frozen-lockfile

# Stage 2: Build the project
FROM node:20-alpine AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN yarn build --filter=user

# Stage 3: Prepare the final image
FROM node:20-alpine AS runner
WORKDIR /app

COPY --from=builder /app/apps/user/.next ./.next
COPY --from=builder /app/apps/user/package.json ./package.json
COPY --from=builder /app/packages ./packages

EXPOSE 3000
CMD ["yarn", "start"]