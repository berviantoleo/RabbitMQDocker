FROM node:20-alpine
WORKDIR /app
COPY package*.json .
RUN npm i --production
COPY . .
CMD ["npm", "start"]
