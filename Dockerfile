FROM node

WORKDIR /usr/src/app

EXPOSE 8080

CMD [ "node", "server.js" ]

RUN npm install mysql url

ADD . /usr/src/app
