FROM node:20-alpine

WORKDIR /app

COPY . .

RUN npm install -g npm@latest

RUN npm install 

EXPOSE 5173

CMD ["npm", "run" , "dev" , "--", "--host"]

