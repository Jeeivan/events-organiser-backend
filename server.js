import "dotenv/config";
import express, { response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import groupRouter from "./routes/api/group.js"
import userRouter from "./routes/api/users.js";
import eventRouter from "./routes/api/event.js";
import attendanceRouter from "./routes/api/attendance.js";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/users', userRouter)
app.use('/group', groupRouter)
app.use('/event', eventRouter)
app.use('/attendance', attendanceRouter)

mongoose.connect(process.env.DATABASE_URL);

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`listening on port: ${port}`);
});

app.get("/", async (req, res) => {
res.json({ message: "Hey There!" });
});