FROM node:22.16.0-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.26.0-alpine AS production
COPY --from=builder /app/dist /usr/share/nginx/html
COPY ../nginx/frontend.conf /etc/nginx/conf.d/default.conf
EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"]