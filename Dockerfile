# Use the official Node.js image.
FROM node:18

# Set the working directory in the container.
WORKDIR /usr/src/app

# Copy package.json and package-lock.json.
COPY package*.json ./

# Install dependencies.
RUN npm install

# Copy the rest of the application code.
COPY . .

COPY wait.sh /wait.sh
RUN chmod +x /wait.sh

# Expose the port the app runs on.
ENV PORT 10000
EXPOSE 10000

# Run the app.
CMD [ "node", "src/app.js" ]
