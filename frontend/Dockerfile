# Stage 1: Builder
FROM node:22.16.0-alpine AS builder

WORKDIR /app

# 1. Install dependencies (including dev deps for TypeScript)
COPY package.json package-lock.json ./
RUN npm ci --include=dev --no-audit --no-fund && \
    npm cache clean --force

# 2. Copy and build
COPY . .
RUN npm run build

# Stage 2: Production
FROM nginx:1.25-alpine

# Remove default config and copy assets
RUN rm /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/

# Security
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html

EXPOSE 5173
CMD ["nginx", "-g", "daemon off;"]