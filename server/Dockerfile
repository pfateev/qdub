
FROM node:16.16-alpine

#RUN addgroup app && adduser -S -G app app
#USER app
RUN npm install -g typescript

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

RUN tsc

EXPOSE 3001

CMD ["npm", "start"]