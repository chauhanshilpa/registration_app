import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { getMongoDb } from "./db.js";
import { v4 as uuidv4 } from "uuid";

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
  // name is mandatory
  const { name } = req.body;
  if (!name) {
    res.status(400).send({ message: "Name cannot be null or empty" });
    return;
  }

  const client = await getMongoDb();
  const collection = client.db(dbName).collection("user");

  // name is unique
  const existingUser = await collection.findOne({ name: name });
  if (existingUser) {
    res.status(400).send({ message: "Name already exists" });
    return;
  }

  const userId = uuidv4();
  const user = { ...req.body, userId: userId };
  let dbResponse = {};
  try {
    dbResponse = await collection.insertOne(user);
  } catch (error) {
    dbResponse = { acknowledged: false };
  }
  if (dbResponse.acknowledged) {
    res.status(200).send(user);
  } else {
    res.status(500).send({ message: "Server Error. Please contact support." });
  }
});

// get user details
app.get("/user", async (req, res) => {
  const { userId } = req.query;
  const client = await getMongoDb();
  const collection = client.db(dbName).collection("user");
  const dbResponse = await collection.findOne({ userId: userId });

  if (dbResponse) {
    res.status(200).send(dbResponse);
  } else {
    res.status(404).send({ message: "No such user exists" });
  }
});

// update user details
app.patch("/user", async (req, res) => {
  const { userId, name, age, dateOfBirth, password, gender, about } = req.body;
  const client = await getMongoDb();
  const collection = client.db(dbName).collection("user");

  const user = await collection.findOne({ userId: userId });
  if (!user) {
    res.status(404).send({ message: "No such user exists" });
    return;
  }

  const dbResponse = await collection.updateOne(
    { userId: userId },
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

  if (dbResponse.acknowledged) {
    res.status(200).send(req.body);
  } else {
    res.status(500).send({ message: "Server Error. Please contact support." });
  }
});

// delete user details
app.delete("/user", async (req, res) => {
  const { userId } = req.query;
  const client = await getMongoDb();
  const collection = client.db(dbName).collection("user");

  const user = await collection.findOne({ userId: userId });
  if (!user) {
    res.status(404).send({ message: "No such user exists" });
    return;
  }

  const dbResponse = await collection.findOneAndDelete({ userId: userId });

  if (dbResponse) {
    res.status(200).send(req.body);
  } else {
    res.status(500).send({ message: "Server Error. Please contact support." });
  }
});

app.listen(port, () => console.log(`App is listening on port ${port}`));
