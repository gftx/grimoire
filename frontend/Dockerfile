# ─── Stage 1: билдим SPA ───────────────────────────────────────────────
FROM node:22-alpine AS builder
WORKDIR /app

# кешируем зависимости
COPY package.json package-lock.json ./
RUN npm ci --include=dev

# билдим
COPY . .
RUN npm run build

# ─── Stage 2: nginx с SSL и прокси ────────────────────────────────────
FROM nginx:1.25-alpine

# Копируем собранный фронтенд
COPY --from=builder /app/dist /usr/share/nginx/html

# Копируем наш конфиг с прокси и SSL
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Права
RUN chown -R nginx:nginx /usr/share/nginx/html

EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]
