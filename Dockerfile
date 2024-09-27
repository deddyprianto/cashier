# Menggunakan image Node.js sebagai base image
FROM node:18-alpine

# Set working directory dalam container
WORKDIR /app

# Copy package.json dan package-lock.json ke dalam container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy semua file ke dalam container
COPY . .

# Build aplikasi Next.js
RUN npm run build

# Expose port 3000, port default untuk Next.js
EXPOSE 3000

# Jalankan aplikasi Next.js
CMD ["npm", "start"]
