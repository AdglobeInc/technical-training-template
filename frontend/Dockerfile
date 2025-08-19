FROM oven/bun:1.2-alpine

WORKDIR /app

COPY package.json bun.lockb* ./

RUN bun install

COPY . .