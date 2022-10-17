FROM node:16.17 as build
WORKDIR /opt/app
ADD package*.json ./
RUN npm install
ADD . .
CMD node index.js