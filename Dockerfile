FROM node:24-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci && npm cache clean --force

COPY . .

RUN npm run build

FROM node:24-alpine AS production

WORKDIR /app

# RUN addgroup -g 1001 -S nodejs
# RUN adduser -S nestjs -u 1001

COPY package*.json ./
COPY . .
RUN npm install
RUN npm install -g @nestjs/cli

EXPOSE 3000

CMD ["nest", "start", "--watch"]

