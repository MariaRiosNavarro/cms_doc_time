import { app } from "./src/app.js";

app.listen(process.env.PORT, () => {
  console.log("Port is: " + process.env.PORT);
});
