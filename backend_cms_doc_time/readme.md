# Docker Container backend - cms_doc_time - Express

## Backend Basic Setup

```javascript
npm init -y
npm i express dotenv multer mongoose nodemailer cookie-pa
rser jsonwebtoken
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
