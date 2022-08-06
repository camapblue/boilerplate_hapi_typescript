FROM node:16.15.0-alpine3.15

# ARG NODE_ENV
# ENV NODE_ENV=$NODE_ENV

WORKDIR /app

# COPY ./start.sh /app/start.sh
# RUN chmod +x /app/start.sh

COPY . .
RUN npm install
RUN rm -rf dist
RUN npm run build

EXPOSE 8000
CMD ["node", "dist/src/server.js"]