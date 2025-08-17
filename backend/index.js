import dotenv from "dotenv";
dotenv.config()
import express from "express";
import router from "./routes/routes.js";
const app = express();
const PORT = process.env.PORT
const mainAPIUrl = process.env.MAIN_API_URL;
console.log(mainAPIUrl);

app.use(`${mainAPIUrl}`, router);

app.listen(PORT, () => {
    console.log('api logged =>', process.env.MAIN_API_URL);
    console.log(`Listening on port ${PORT}`);
})
