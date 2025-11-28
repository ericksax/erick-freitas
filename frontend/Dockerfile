
FROM node:20 AS base
WORKDIR /app
RUN npm install -g pnpm

FROM base AS deps
WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

FROM base AS development
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

EXPOSE 5173
CMD ["pnpm", "run", "dev"]

FROM base AS build
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm run build

FROM nginx:alpine AS production

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
