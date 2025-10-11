import express from "express";
import cors from "cors";
import router from "./routes/school.js";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const corsOptions = {
  origin: "*",
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const appapi = "/tutionblocks/api/";
const port = process.env.PORT || 5000;
app.use(`${appapi}school/`, router);
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
