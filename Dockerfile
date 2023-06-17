#STAGE 1
FROM node:latest AS node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

#STAGE 2
FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=node /app/dist/ok-admin /usr/share/nginx/html