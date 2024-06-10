# Use a specific version tag instead of "alpine" to ensure consistent builds
FROM node:16-alpine

# Set the working directory inside the container
WORKDIR /app

# Install dependencies in a way that optimizes caching
COPY package*.json ./
COPY .env ./

# Install packages
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Set the environment variable PORT
ARG PORT=8080
ENV PORT=$PORT

# Expose the specified port
EXPOSE $PORT

# Execute app
CMD ["npm", "start"]