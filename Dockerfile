FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN yarn install

COPY . .

EXPOSE 8080

CMD [ "npm", "run", "start:migrate:dev" ]