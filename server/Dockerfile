FROM node:16.15.1 


# Create Directory for the Container
WORKDIR /usr/src/app

# Only copy the package.json file to work directory
COPY package.json .

# Install all Packages
RUN npm install

# Copy all other source code to work directory
ADD . /usr/src/app

# Lint

RUN npm run lint

# Unit tests
RUN npm test


# TypeScript
RUN npm run build



# Start
CMD ["node","build/src/server.js"]

EXPOSE 3000