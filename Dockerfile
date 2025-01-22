FROM node:20-alpine3.19 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:20-alpine3.19 AS runtime
WORKDIR /app
COPY --from=build /app /app
RUN npm install
RUN chmod +x dist/CaporalCommand/index.js

ENTRYPOINT ["node", "/app/dist/index.js"]