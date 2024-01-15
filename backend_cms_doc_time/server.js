import express from "express";

const app = express();

app.listen(process.env.PORT, () => {
  console.log("Port is: " + process.env.PORT);
});
