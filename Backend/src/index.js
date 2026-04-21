import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import { Connectdb } from "./db/index.js";

Connectdb()
  .then(() => {
    const port = process.env.PORT || 7000;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("CRITICAL: Database connection failed. Exiting...", error);
    process.exit(1);
  });