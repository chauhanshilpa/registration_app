import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const port =  4002;
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.listen(port, () => console.log(`App is listening on port ${port}`));
