FROM node:20-alpine AS builder
WORKDIR /app

ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

ARG VITE_NAVER_CLIENT_ID
ENV VITE_NAVER_CLIENT_ID=$VITE_NAVER_CLIENT_ID

ARG VITE_NAVER_RETURN_URL
ENV VITE_NAVER_RETURN_URL=$VITE_NAVER_RETURN_URL

COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:1.27-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
