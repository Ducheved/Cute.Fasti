FROM node:21.6.2-bookworm-slim as builder
WORKDIR /app
ENV PATH /usr/src/node_modules/.bin:$PATH
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL
COPY package*.json ./
RUN npm install
COPY . .

FROM builder as dev
CMD ["npm", "run", "dev"]

FROM builder as prod-builder
RUN npm run build

FROM nginx:mainline-alpine3.18 as production-stage
COPY --from=prod-builder /app/dist /usr/share/nginx/html
COPY builds/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]