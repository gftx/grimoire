# Stage 1: Builder
FROM node:22.16.0-alpine AS builder

WORKDIR /app

# 1. Install ALL dependencies (including devDependencies for build)
COPY package.json package-lock.json ./
RUN npm ci && \  # Keep devDependencies for build

# 2. Copy and build source code
COPY . .
RUN npm run build

# Stage 2: Production server
FROM nginx:1.25-alpine

# Remove default config and copy custom one
RUN rm /etc/nginx/conf.d/default.conf
COPY --from=builder /app/nginx/nginx.conf /etc/nginx/conf.d/

# Copy built assets
COPY --from=builder /app/dist /usr/share/nginx/html

# Security hardening
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html

EXPOSE 5173
CMD ["nginx", "-g", "daemon off;"]