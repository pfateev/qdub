
FROM node:16.16-alpine

ARG NODE_ENV=production

ARG BUILD_PORT $BUILD_PORT

ENV NODE_ENV $NODE_ENV


## Optional: set the working directory
#WORKDIR /home/node/app

# Optional: copy files from the host to the container
COPY package.json ./

# Optional: expose the container's ports
EXPOSE $BUILD_PORT

## Optional: run commands to install dependencies
#RUN npm build

# Optional: add a user to the container
USER node

# Required: define the command to run when the container starts
CMD ["npm", "start"]