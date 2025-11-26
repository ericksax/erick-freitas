FROM node:20-alpine


WORKDIR /usr/src/app


COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* ./


RUN if [ -f pnpm-lock.yaml ]; then npm install -g pnpm && pnpm install; \
elif [ -f yarn.lock ]; then yarn install --frozen-lockfile; \
elif [ -f package-lock.json ]; then npm ci; \
else npm install; fi


COPY . .


RUN npm run build


ENV NODE_ENV=production


CMD ["node", "dist/main.js"]