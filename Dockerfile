FROM node

ADD . /usr/src/app
WORKDIR /usr/src/app

# install your application's dependencies
RUN npm install mysql url

# replace this with your application's default port
EXPOSE 80

# replace this with your main "server" script file
CMD [ "node", "/usr/src/app/server.js" ]
