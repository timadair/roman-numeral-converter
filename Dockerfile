# 1. Build stage for frontend
FROM node:20-alpine as frontend

WORKDIR /app

COPY web ./web
RUN cd web && npm install -g pnpm && pnpm install && pnpm run build

# 2. Backend stage with static files from frontend build
FROM node:20-alpine

WORKDIR /app/api

# Install backend deps
COPY api/. ./
RUN npm install -g pnpm && pnpm install

# Build backend TypeScript
RUN pnpm build

# Copy built frontend from previous stage to the backend's dist/public directory
COPY --from=frontend /app/web/dist ./dist/public

# Set env for production
ENV NODE_ENV=production

# Expose backend port
EXPOSE 8080

# Start your backend
CMD ["pnpm", "start"] 