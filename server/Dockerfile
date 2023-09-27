FROM node:18.17.1
LABEL authors="ahmed"

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install -g npm@10.1.0

RUN npm install

COPY . .

EXPOSE 3000:3000

CMD ["npm","start"]