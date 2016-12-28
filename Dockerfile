FROM node:latest

# Copy project files and change working directory
COPY . .
WORKDIR .

# Expose container port
ENV PORT=8080
EXPOSE $PORT

# Install npm dependencies and run application
RUN npm install
CMD [ "npm", "run" , "start:dev" ]