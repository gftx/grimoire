# Stage 1: Builder
FROM node:22.16.0-alpine AS builder

WORKDIR /app

# Install dependencies (with cache optimization)
COPY package.json package-lock.json* ./
RUN npm ci --omit=dev && \
    npm cache clean --force

# Copy Prisma schema and generate client
COPY prisma ./prisma
RUN npx prisma generate

# Copy and build application
COPY . .
RUN npm run build

# Stage 2: Runtime
FROM node:22.16.0-alpine

WORKDIR /app

# Copy from builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

# Security hardening
RUN apk add --no-cache dumb-init && \
    chown -R node:node /app
USER node

EXPOSE 3000

# Health check and startup
HEALTHCHECK --interval=30s --timeout=3s CMD curl -f http://localhost:3000/api/health || exit 1

ENTRYPOINT ["dumb-init", "--"]
CMD ["sh", "-c", "npx prisma migrate deploy && npm run start:prod"]
