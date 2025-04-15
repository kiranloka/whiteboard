import express from "express";
import cors from "cors";

const PORT = 3001;

const app = express();
app.use(express.json());
app.use(cors());

import rootRouter from "./routes/index";

app.use("/api/v1", rootRouter);

app.listen(PORT, () => {
  console.log(`HTTP backend is listening on the port ${PORT}`);
});
