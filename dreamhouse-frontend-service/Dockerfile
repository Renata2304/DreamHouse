# Build Stage
FROM node:22.15.1-alpine AS build
WORKDIR /app
COPY ./dreamhouse-frontend-service/package*.json ./
RUN npm install
COPY ./dreamhouse-frontend-service/ .
RUN npm run build

# Production Stage
FROM nginx:stable-alpine AS production
COPY --from=build /app/dist /usr/share/nginx/html
COPY ./dreamhouse-frontend-service/nginx/nginx.conf /etc/nginx/nginx.conf
EXPOSE 3001
CMD ["nginx", "-g", "daemon off;"]
