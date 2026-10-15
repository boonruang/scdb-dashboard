FROM node:18-alpine AS builder
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
# API calls ผ่าน nginx proxy /api/ → backend container
# ไม่ต้องระบุ host เพราะ nginx จัดการให้
ARG REACT_APP_SERVICE_URL=""
RUN yarn build

FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# สร้าง self-signed certificate สำหรับ Faculty of Science, MSU
RUN apk add --no-cache openssl && \
    mkdir -p /etc/nginx/certs && \
    openssl req -x509 -nodes -days 3650 -newkey rsa:2048 \
      -keyout /etc/nginx/certs/server.key \
      -out    /etc/nginx/certs/server.crt \
      -subj "/C=TH/ST=Maha Sarakham/L=Maha Sarakham/O=Mahasarakham University/OU=Faculty of Science/CN=science.msu.ac.th"

EXPOSE 80 443
