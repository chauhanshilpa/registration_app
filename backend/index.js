import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { getMongoDb } from "./db.js";
import { ObjectId } from "mongodb";

const port = 4002;
const app = express();
const dbName = "registrationapp";
app.use(cors());
app.use(bodyParser.json());

app.get("/health", async (req, res) => {
  res.send({ message: "Welcome to User Registration" });
});

// add user details
app.post("/user", async (req, res) => {
  const client = await getMongoDb();
  const collection = client.db(dbName).collection("user");
  const user = await collection.insertOne(req.body);
  res.send(user.acknowledged ? { ...req.body, userId: user.insertedId.toString() } : {});
});
 
// get user details
app.get("/user", async (req, res) => {
  const { userId } = req.query;
  const client = await getMongoDb();
  const collection = client.db(dbName).collection("user");
  const user = await collection.findOne({ _id: new ObjectId(userId) });
  res.send(user ? user : {});
});

app.patch("/user", async (req, res) => {
  const { userId, name, age, dateOfBirth, password, gender, about } = req.body;
  const client = await getMongoDb();
  const collection = client.db(dbName).collection("user");
  const user = await collection.updateOne(
    { _id: new ObjectId(userId) },
    {
      $set: {
        name,
        age,
        dateOfBirth,
        password,
        gender,
        about,
      },
    }
  );
  res.send(user.acknowledged ? req.body : {});
});

app.delete("/user", async (req, res) => {
  const { userId } = req.query;
  const client = await getMongoDb();
  const collection = client.db(dbName).collection("user");
  await collection.findOneAndDelete({ _id: new ObjectId(userId) });
  res.send();
});

app.listen(port, () => console.log(`App is listening on port ${port}`));
