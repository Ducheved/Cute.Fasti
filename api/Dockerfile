FROM node:21.6.2-bookworm-slim as builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build


FROM node:21.6.2-bookworm-slim as production
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
ENV REDIS_ADDRESS=
ENV REDIS_PORT=
ENV REDIS_DB=
ENV REDIS_USER=
ENV REDIS_PASSWORD=
ENV REDIS_PREFIX=
ENV ADDRESS=
ENV PORT=
ENV CORS_ORIGIN=localhost
ENV JWT_SECRET=
EXPOSE ${PORT}
CMD ["node", "dist/app.js"]