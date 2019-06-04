FROM node:carbon

WORKDIR src/
WORKDIR server/

COPY package*.json ./
COPY webpack.config.js ./
COPY src src/
COPY server server/

RUN npm install

EXPOSE 3001
CMD [ "npm", "run", "server" ]
