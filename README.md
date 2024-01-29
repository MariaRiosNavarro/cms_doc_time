# cms_doc_time (docker compose)

4 collections, when the user registers he/she is saved in users and in the corresponding collection. In the user collection we store the reference id of the collection. I.e. patients and doctors are stored both in users (only password + salt) and in their collection (patients/doctors) with their more specific data.

Appointments have their own collection with id reference to the corresponding patient and doctor.

Admin are only reflected in the user collection.  Admins can only be created internally (e.g. thunder client) or an existing user can create an admin user in her/his dashboard. Each group has its own dashboard with its own path, where you always see at the top whether you are logged in or not and can log out at any time.

Both doctors and patients can edit their profile as soon as they register and upload a current photo to cloudinary, a placeholder is shown at the beginning.

The user can choose a doctor from the list of doctors and make an appointment, the appointment will appear on the dashboard of both doctors with the property to be confirmed. This appointment can be confirmed or cancelled by the doctor.

Email sending, style finalisation, docker deployment & testing still to be integrated.

# Setup info

Frontend Container:  React + React Router + Vite + Tailwind + DaisyUI (darkmode available)

Backend Container : Express (+ dotenv multer mongoose nodemailer cookie-parser jsonwebtoken cloudinary jest supertest). 4 Colletions. Users for only email password and role (with id role reference in the collection id)

## For now works:

Sign-up & login for admin, patients & doctors works (json token)

Protected Routes for for admin, patients & doctors works

Only Admin can delete users.

# TO DO

email implementation
deployment in docker?
style finish


# Images

# Home , login , sign-up

![Home](/assets/1.png)
![Home](/assets/2.png)
![Home](/assets/3.png)
![Home](/assets/4.png)
# Patients

![Home](/assets/p1.png)
![Home](/assets/p2.png)
![Home](/assets/p3.png)
![Home](/assets/p4.png)
![Home](/assets/p5.png)
![Home](/assets/p6.png)
![Home](/assets/p7.png)



# Doctors

![Home](/assets/d1.png)
![Home](/assets/d2.png)


# Structure, Miro Board  & Design

[Figma Design](https://www.figma.com/file/sWpX4BUzxivFq5kUfn5x3k/Doctor-Appointments-UI-KIt-(Community)-(Copy)?type=design&node-id=0-72&mode=design&t=BjXYiEBLQiw1or6I-0)

[Miro Structure & Board](https://miro.com/welcomeonboard/SDRNQko1V2tnSWFnVWhZNkR2SlFNWlJvR0RTVURNNldEeTRMWkZ3M0RZTWRlNmp2TmtCZmY0elRIalZWckRsU3wzNDU4NzY0NTUxMDYyNTY5MTUyfDI=?share_link_id=233654990445)

# Docker SETUP

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




