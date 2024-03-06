FROM node:18.16.0

COPY . .

RUN npm install

EXPOSE 7000

CMD [ "npm" ,"start" ]
