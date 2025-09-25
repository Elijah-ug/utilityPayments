import express from "express";
const router = express.Router();

router.get("/", (req, res) => res.send({message: "Read data working cool"}));
router.post('/', (req, res) => res.send({message: 'Add data working best'}));
router.put('/:detail', (req, res) => res.send({message: 'Update data working correctly'}));
router.delete('/:detail', (req, res) => res.send({message: 'Delete data working correctly'}));


export default router;
