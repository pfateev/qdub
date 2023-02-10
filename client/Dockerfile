
FROM node:16.16-alpine

#RUN addgroup app && adduser -S -G app app
#USER app

WORKDIR /app

COPY package*.json .

RUN npm install && npm run build && npm prune --production

COPY . .

EXPOSE 3000

CMD ["npm", "start"]