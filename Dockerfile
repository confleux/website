FROM node:17

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i 

COPY . .

EXPOSE 443
EXPOSE 80

CMD ["node", "index.js"]
