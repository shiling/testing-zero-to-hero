FROM node:18

# Create app directory
RUN mkdir -p /workspace/
WORKDIR /workspace/

# Install app dependencies
COPY package*.json ./
RUN npm install

# If you are building your code for production
# RUN npm ci --omit=dev

# Bundle app source
COPY . .

# Expose port 3000
EXPOSE 3000

# Run the server program
CMD ["npm", "run", "start"]