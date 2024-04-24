# Use the official Node.js image as the base image
FROM node:latest

# Set the working directory in the container
WORKDIR /my-react-app

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project to the working directory
COPY . .

# Build the React app
RUN npm run build

# Expose port 80 to the outside world
EXPOSE 3000

# Start Nginx server
CMD ["npm","start"]
