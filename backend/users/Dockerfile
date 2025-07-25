FROM node:18-bullseye-slim

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY prisma ./prisma

RUN npm run prisma:generate

COPY . .

EXPOSE 3003

CMD [ "npm", "start" ] 