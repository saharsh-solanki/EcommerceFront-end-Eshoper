# Stage 1: Build
FROM node:18.20.3 AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN NODE_OPTIONS=--openssl-legacy-provider npm run build

# Stage 2: Serve
FROM node:18.20.3

WORKDIR /app
COPY --from=builder /app/build ./build
COPY --from=builder /app/server.js ./
COPY --from=builder /app/package*.json ./

# ✅ Pin express version
RUN npm install express@4.17.1 express-favicon

EXPOSE 8080
CMD ["node", "server.js"]
