import { prisma } from "../prisma/client";

export const addTx = async (req, res) => {
  try {
    console.log("Tx added ✅");
    const { txHash, gasUsed, to, from, time } = req.body;
    const newTx = await prisma.onChainTxReceipts.create({
      data: { txHash, gasUsed, to, from, time },
    });
    console.log("Tx added ✅");
    res.status(200).json(newTx);
  } catch (error) {
    console.log("Error==>" + error.message);
    res.status(500).json({ error: error });
  }
};

export const txs = async (req, res) => {
  try {
    const allTxs = await prisma.onChainTxReceipts.findMany();
    console.log("Txs wired ✅");
    res.status(200).json(allTxs);
  } catch (error) {
    console.log("Error==>" + error.message);
    res.status(500).json({ error: error });
  }
};

export const tx = async (req, res) => {
  try {
    const txId = parseInt(req.params.tx);
    const oneTx = await prisma.onChainTxReceipts.findUnique({
      where:{id: txId}
    })
    console.log("Tx gotten ✅");
    res.status(200).json(oneTx);
  } catch (error) {
    console.log("Error==>" + error.message);
    res.status(500).json({ error: error });
  }
};
