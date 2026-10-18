# Practical 11 Backend Dockerfile
FROM node:18-alpine

WORKDIR /app

# Cache dependencies
COPY package*.json ./
RUN npm install --production

# Copy application source code
COPY . .

# Expose backend port
EXPOSE 5000

# Set entry point
CMD ["node", "server.js"]
