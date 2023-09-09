FROM node:18.17.1
LABEL authors="ahmed"

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

CMD ["npm","start"]
