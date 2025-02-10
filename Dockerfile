FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy project files
COPY . .

# Set environment variables
ENV NODE_ENV=development
ENV VITE_HOST=0.0.0.0

# Expose Vite's default port
EXPOSE 5173

# Start development server
CMD ["npm", "run", "dev", "--", "--host"]