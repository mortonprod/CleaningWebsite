#Create our node app enviroment.
FROM node:latest
#Create new directory in node enviroment.
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install npm dependencies and run application
COPY package.json /usr/src/app/
RUN npm install --production
RUN npm cache clean