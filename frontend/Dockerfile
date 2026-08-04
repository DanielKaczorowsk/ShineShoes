FROM node:22-alpine AS build

LABEL authors="DKacz"

WORKDIR /build

COPY package*.json ./

RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine

COPY /conf/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /build/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]