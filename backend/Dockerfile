# Use Node.js official image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Install nodemon globally
RUN npm install -g nodemon


# Copy the rest of the backend code
COPY . .

# Expose the port your app runs on (change if needed)
EXPOSE 5000

# Start the app
CMD ["npm", "start"]
