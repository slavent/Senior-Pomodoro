FROM node:carbon

WORKDIR server/

COPY package*.json ./
COPY . server/

RUN npm install

EXPOSE 3001
CMD [ "npm", "run", "server" ]
