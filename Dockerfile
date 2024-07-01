FROM node:20.9.0-alpine3.18
WORKDIR /
COPY . .
RUN npm i -g pnpm
RUN pnpm install
CMD [ "pnpm", "run", "prod" ]