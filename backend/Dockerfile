# Use Node.js LTS version
FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy app source
COPY . .

# Expose port
EXPOSE 3001

# Environment variables (can be overridden)
ENV NODE_ENV=production
ENV PORT=3001

# Start the app
CMD ["node", "server.js"]
