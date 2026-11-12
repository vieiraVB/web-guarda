FROM node:22-bookworm-slim AS frontend-build

WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ ./
ARG VITE_API_URL=/api
ARG VITE_BASE_PATH=/
ENV VITE_API_URL=${VITE_API_URL}
ENV VITE_BASE_PATH=${VITE_BASE_PATH}
RUN npm run build

FROM node:22-bookworm-slim AS runtime

ENV NODE_ENV=production
ENV PORT=3000
WORKDIR /app/backend
RUN apt-get update && apt-get install -y --no-install-recommends openssl && rm -rf /var/lib/apt/lists/*
COPY backend/package*.json ./
RUN npm ci --omit=dev
COPY backend/ ./
RUN DATABASE_URL=postgresql://build:build@localhost:5432/build?schema=public npx prisma generate
COPY --from=frontend-build /app/frontend/dist ./public

EXPOSE 3000
CMD ["node", "scripts/start-container.cjs"]
