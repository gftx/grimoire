# Stage 1: Build application
FROM node:22.16.0-alpine AS builder

WORKDIR /app

# 1. Install dependencies (with layer caching)
COPY package.json package-lock.json ./
RUN npm ci --omit=dev && \
    npm cache clean --force

# 2. Copy and build source code
COPY . .
RUN npm run build

# Stage 2: Production server
FROM nginx:1.25-alpine

# 1. Remove default Nginx config
RUN rm /etc/nginx/conf.d/default.conf

# 2. Copy custom Nginx config
COPY --from=builder /app/nginx/nginx.conf /etc/nginx/conf.d/

# 3. Copy built assets from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# 4. Security hardening
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html

# 5. Health check
HEALTHCHECK --interval=30s --timeout=3s \
  CMD curl -f http://localhost:5173 || exit 1

EXPOSE 5173

# 6. Start Nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
