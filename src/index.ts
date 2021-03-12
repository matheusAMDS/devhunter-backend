import "dotenv/config"
import mongoose from "mongoose"

import { StartCron } from "./workers"
import app from "./api"
import { PORT, DATABASE_URL } from "./config"

mongoose.connect(DATABASE_URL, {
  useFindAndModify: false,
  useUnifiedTopology: true,
  useNewUrlParser: true
})

StartCron()

app.listen(PORT, () => {
  console.log("API running on port " + PORT)
})