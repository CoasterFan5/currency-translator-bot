FROM node:20.9.0-alpine3.18
WORKDIR /app
COPY . .
RUN npm i -g pnpm
RUN pnpm install
CMD [ "npx", "tsx", "index.ts" ]