# --- Build stage ----
FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

COPY . .
RUN npm run build

# --- Production Stage ---
FROM nginx:alpine

# Remove default files
RUN rm -rf /usr/share/nginx/html/*

# Copy build output
COPY --from=builder /app/dist /usr/share/nginx/html

# Optional: custom config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 4321

CMD [ "nginx", "-g", "daemon off;" ]