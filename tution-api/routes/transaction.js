import express from "express";
import { addTx, tx, txs } from "../controllers/txController.js";

const txRouter = express.Router();

txRouter.get("/", txs);
txRouter.get("/:school", tx);
txRouter.post("/", addTx);
// router.put("/:school", )

export default txRouter;
