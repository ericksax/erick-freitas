# Etapa base com pnpm global
FROM node:20 AS base
WORKDIR /app
RUN npm install -g pnpm

# Copia e instala dependências
COPY package*.json pnpm-lock.yaml* ./
RUN pnpm install

# =====================
# Etapa de desenvolvimento
FROM base AS development
WORKDIR /app
COPY . .
EXPOSE 5173
CMD ["pnpm", "run", "dev"]

# =====================
# Etapa de build (produção)
FROM base AS build
WORKDIR /app
COPY . .
RUN pnpm run build

# =====================
# Etapa final com Nginx
FROM nginx:alpine AS production
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
