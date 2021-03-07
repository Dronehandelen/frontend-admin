FROM node:14 as build
WORKDIR /app
COPY . .
RUN mkdir -p build; rm /app/build/static/**/*.map

FROM nginx:alpine as prod
WORKDIR /usr/share/nginx/html
RUN apk update; apk add bash
COPY --from=build /app/build /usr/share/nginx/html
COPY ./docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY ./createEnvFile.sh /createEnvFile.sh
EXPOSE 80
CMD bash /createEnvFile.sh /usr/share/nginx/html; nginx -g "daemon off;"

FROM node:14 as dev
WORKDIR /app
EXPOSE 3000
CMD yarn; yarn start