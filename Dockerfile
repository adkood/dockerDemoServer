# Use the official Node.js image as the base image
FROM node:20

# Set the working directory in the container
WORKDIR /myServer

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Expose port 5000
EXPOSE 5000

# Start the application
CMD ["npm", "start"]
