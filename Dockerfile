# === Stage 1: Build the React app ===
FROM node:20 AS builder

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install --force

# Copy the rest of the app
COPY . .

# Build the React app (this will go into build/client by your setup)
RUN npm run build

# === Stage 2: Serve the app with a lightweight server ===
FROM node:20-alpine AS production

# Install serve (or any other lightweight static file server)
RUN npm install -g serve

# Copy build output from previous stage
WORKDIR /app
COPY --from=builder /app/build/client ./build

# Expose port
EXPOSE 3000

# Serve the build folder
CMD ["serve", "-s", "build", "-l", "3000"]
