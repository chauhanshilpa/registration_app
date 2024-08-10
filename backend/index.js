import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { getMongoDb } from "./db.js";

const port = 4002;
const app = express();
const dbName = "registrationapp"
app.use(cors());
app.use(bodyParser.json());

// add user details
app.post("/user", async (req, res) => {
  const client = await getMongoDb();
  const collection = client.db(dbName).collection("user");
  const user = await collection.insertOne(req.body);
  res.send(user ? req.body : {});
});

// get user details
app.get("/user", async (req, res) => {
  const { name } = req.query;
  const client = await getMongoDb();
  const collection = client.db(dbName).collection("user");
  const user = await collection.findOne({ name: name });
  res.send(user ? user : {});
});

app.listen(port, () => console.log(`App is listening on port ${port}`));
