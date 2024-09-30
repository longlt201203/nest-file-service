# Build with Yarn
FROM node:20 AS builder
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn
COPY . .
RUN yarn build

FROM node:20 AS runner
RUN apt upgrade && \
    apt install -y ffmpeg
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn
COPY --from=builder /app/dist ./
CMD ["node", "main"]