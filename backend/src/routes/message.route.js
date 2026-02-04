import express from "express";

const router = express.Router();

router.get("/send", (_req, res) => {
  res.send("Messages route");
});

export default router;