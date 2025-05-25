FROM node:16-alpine
WORKDIR /app
COPY . .
EXPOSE 8082
CMD ["node", "index.js"]