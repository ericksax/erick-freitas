FROM node:20-alpine

# Instala pnpm globalmente
RUN npm install -g pnpm

WORKDIR /usr/src/app

# Copia apenas os manifestos para aproveitar cache
COPY pnpm-lock.yaml package.json ./

# Instala dependências usando o PNPM
RUN pnpm install --frozen-lockfile

# Copia o restante do projeto
COPY . .

# Build do NestJS
RUN pnpm run build

ENV NODE_ENV=production

CMD ["node", "dist/main.js"]
