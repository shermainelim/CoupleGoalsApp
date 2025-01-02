FROM node:16

WORKDIR /client

COPY package.json package-lock.json ./

RUN npm install

COPY . . 

EXPOSE 2000

CMD ["npm", "run", "start"]