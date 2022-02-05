FROM node:17

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install 

COPY . ./

COPY server.key ./
COPY server.cert ./

EXPOSE 80

CMD ["node", "index.js"]
