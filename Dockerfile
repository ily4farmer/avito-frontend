# 1 Base image 
FROM node:22.23.4-alpine AS base

LABEL version="1.0.1"

RUN npm i -g pnpm

WORKDIR /app

COPY . .

RUN pnpm run build

# 2 Final prod image
FROM node:22.23.4-alpine AS prod

WORKDIR /app

COPY --from=base /app/dist ./dist
