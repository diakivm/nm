FROM node:14

WORKDIR /app
EXPOSE 4000
COPY package*.json ./

RUN npm install
COPY . .