export const schools = async (req, res) => {
  try {
    console.log("schools wired ✅");
    res.status(200).json({ message: "✅ Schools route connected" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
