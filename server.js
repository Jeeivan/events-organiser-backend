import "dotenv/config";
import express, { response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.DATABASE_URL);

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`listening on port: ${port}`);
});

app.get("/", async (req, res) => {
res.json({ message: "Hey There!" });
});