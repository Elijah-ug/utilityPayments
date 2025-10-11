export const addTx = async (req, res) => {
  try {
    console.log("Tx added ✅");
    res.status(200).json({ message: "✅ Tx added successfully" });
  } catch (error) {
    console.log("Error==>" + error.message);
    res.status(500).json({ error: error });
  }
};

export const txs = async (req, res) => {
  try {
    console.log("Txs wired ✅");
    res.status(200).json({ message: "✅ Txs route displayed" });
  } catch (error) {
    console.log("Error==>" + error.message);
    res.status(500).json({ error: error });
  }
};

export const tx = async (req, res) => {
  try {
    console.log("Tx gotten ✅");
    res.status(200).json({ message: "✅ Tx accessed" });
  } catch (error) {
    console.log("Error==>" + error.message);
    res.status(500).json({ error: error });
  }
};
