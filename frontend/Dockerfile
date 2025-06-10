FROM node:22.16.0-alpine AS builder

WORKDIR /app

# Cache dependencies
COPY package.json package-lock.json* ./
RUN npm ci --omit=dev && \
    npm cache clean --force

# Build application
COPY . .
RUN npm run build

# Runtime image
FROM nginx:1.25-alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 5173

HEALTHCHECK --interval=30s --timeout=3s CMD curl -f http://localhost:5173 || exit 1