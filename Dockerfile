FROM node:16
WORKDIR /usr/app


COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 9000

CMD [ "node", "./src/index.js" ]
