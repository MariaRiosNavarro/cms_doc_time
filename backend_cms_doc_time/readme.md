# Docker Container backend - cms_doc_time - Express

## Backend Basic Setup

```javascript
npm init -y
npm i express dotenv multer mongoose nodemailer cookie-parser jsonwebtoken
npm i cloudinary
npm i -D jest supertest

```

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




# Recommendations

### DONT FORGET MULTER in your FORMS !!!!!!

otherwise the empty req.body will be sent to your controller.

```
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.put("/:id", checkToken, upload.single("avatar"), editOnePatient);