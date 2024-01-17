FROM node:alpine   
WORKDIR /app
COPY . .
RUN npm i
EXPOSE 9999
CMD [ "node","--watch","server.js" ]