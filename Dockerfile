FROM node:latest
#Create new directory in node enviroment.
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY ./dist /usr/src/app/dist
# Expose container port
ENV PORT=8080
EXPOSE $PORT

# Install npm dependencies and run application
COPY package.json /usr/src/app/
RUN npm install
CMD [ "npm", "run" , "prod:start" ]