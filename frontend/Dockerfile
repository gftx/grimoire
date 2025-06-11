# Stage 1: Build
FROM node:22-alpine AS builder
WORKDIR /app

# Cache dependencies
COPY package.json package-lock.json ./
RUN npm ci --include=dev

# Build app
COPY . .
RUN npm run build

# Stage 2: Production
FROM nginx:1.25-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Security
RUN chown -R nginx:nginx /usr/share/nginx/html
EXPOSE 5173
