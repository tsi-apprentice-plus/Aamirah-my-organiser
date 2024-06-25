FROM node:22

WORKDIR /app

COPY package*.json ./

RUN npm install 

COPY . .

EXPOSE 8081:8080

CMD ["npm", "start"]