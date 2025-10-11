import express from "express";
import cors from "cors";
import router from "./routes/school.js";
import dotenv from "dotenv";
import txRouter from "./routes/transaction.js";
dotenv.config();
const app = express();
const corsOptions = {
  origin: "*",
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const appapi = "/tutionblocks/api/school";
const txApi = "/tutionblocks/api/tx";
const port = process.env.PORT || 5000;
app.use(appapi, router);
app.use(txApi, txRouter);
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
