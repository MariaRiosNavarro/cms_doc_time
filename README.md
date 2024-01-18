# Docker Compose - cms_doc_time

Frontend Container:  React + React Router + Vite + Tailwind + DaisyUI

Backend Container : Express (+ dotenv multer mongoose nodemailer cookie-parser jsonwebtoken cloudinary jest supertest)


# Structure, Miro Board  & Design

[Figma Design](https://www.figma.com/file/sWpX4BUzxivFq5kUfn5x3k/Doctor-Appointments-UI-KIt-(Community)-(Copy)?type=design&node-id=0-72&mode=design&t=BjXYiEBLQiw1or6I-0)

[Miro Structure & Board](https://miro.com/welcomeonboard/SDRNQko1V2tnSWFnVWhZNkR2SlFNWlJvR0RTVURNNldEeTRMWkZ3M0RZTWRlNmp2TmtCZmY0elRIalZWckRsU3wzNDU4NzY0NTUxMDYyNTY5MTUyfDI=?share_link_id=233654990445)

# SETUP

## Docker Frontend DEV

Follow this [intructions(readme)](https://github.com/MariaRiosNavarro/docker_react_vite_DEV) to create a DEV react container

- Summary : 
Create a node container, install vite-react(npm i) in it and copy the content to our frontend folder.

terminal 1:
```sh
docker run -it node:alpine sh
ls-l
mkdir app
cd app
create vite@latest frontend_cms_doc_time -- --template react
yes
cd frontend_cms_doc_time
npm i
````

terminal 2 (in the root yours project, inside only the backend empty folder):

```sh
docker ps //save the container id of the new created container
docker cd c6bba12e:/app/frontend_cms_doc_time
cd frontend_cms_doc_time
```

## Frontend Basic Setup

```javascript
npm i react-router-dom
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
npm i -D daisyui@latest

```

### tailwind.config.js

```javascript

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  daisyui: {
    themes: ["pastel", "dark", "retro"],
  },
  plugins: [require("daisyui")],
};

```

## Backend Basic Setup

```javascript
npm init -y
npm i express dotenv multer mongoose nodemailer cookie-parser jsonwebtoken morgan
npm i cloudinary
npm i -D jest supertest

````
### package.json

```json
 "type": "module",
```

### create a .gitignore

```
node_modules/
```
### Create a basic server.js

```javascript
import express from "express";

const app = express();

app.listen(process.env.PORT, () => {
  console.log("Port is: " + process.env.PORT);
});
```

# Create the Docker Compose 

## Docker files in Frontend

### Create .dockerignore

```
node_modules/
```
### Dockerfile

```docker
FROM node:alpine   
WORKDIR /app
COPY . .
RUN npm i
ENV PORT 5173
EXPOSE ${PORT}
CMD [ "npm","run","dev","--","--host" ]
```

## Docker Files in Backend

### Create .dockerignore

```
node_modules/
```
### Dockerfile

```docker
FROM node:alpine   
WORKDIR /app
COPY . .
RUN npm i
ENV PORT 9999
EXPOSE ${PORT}
CMD [ "node","--watch","server.js" ]
```



## Docker-compose file in the root


### Create the compose file in the root 

2 posibilities:

-With mongodb local:

````
version: '3.8'
services:
  backend:
    build: ./backend_cms_doc_time
    container_name: backend_cms_doc_time
    ports:
      - 9999:9999
    volumes:
      - ./backend_cms_doc_time:/app
    networks:
      - backend_network
      - frontend_network
    depends_on:
      - database
  frontend:
    build: ./frontend_cms_doc_time
    container_name: frontend_cms_doc_time
    ports:
      - 80:5173
    volumes:
      - ./frontend_cms_doc_time:/app
    networks:
      - frontend_network
  database:
    image: mongo:latest
    container_name: cms_mongo_db
    ports:
      - 27019:27017
    volumes:
      - cms_mongodb_data:/data/db
    networks:
      - backend_network
volumes:
  cms_mongodb_data:
networks:
  backend_network:
  frontend_network:
````

-With mongodb Atlas(Cloud):
```
version: '3.8'
services:
  backend:
    build: ./backend_cms_doc_time
    container_name: backend_cms_doc_time
    environment:
      - MONGODB_URI=$MONGO_ATLAS_URI
    ports:
      - $BACKENDPORT:9999
    volumes:
      - ./backend_cms_doc_time:/app
    networks:
      - backend_network
      - frontend_network
  frontend:
    build: ./frontend_cms_doc_time
    container_name: frontend_cms_doc_time
    ports:
      - $FRONTENDPORT:5173
    volumes:
      - ./frontend_cms_doc_time:/app
    networks:
      - frontend_network
networks:
  backend_network:
  frontend_network:

```

- Create the compose

```
docker compose up
```



### Test the compose in terminal:


Open the Backend and Frontend Ports in your Browser to check if works

Here 

9999 for Backend

80 for frontend 

For 27019 at MongoDB (open MongoDB Compass in your computer and open port 27019)
if you can open it, works


-------


