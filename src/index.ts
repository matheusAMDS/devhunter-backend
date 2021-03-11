import "dotenv/config"
import { StartCron } from "workers"
import app from "api"
import { PORT, DATABASE_URL } from "config"
import mongoose from "mongoose"

mongoose.connect(DATABASE_URL, {
  useFindAndModify: false,
  useUnifiedTopology: true,
  useNewUrlParser: true
})

StartCron()

app.listen(PORT, () => {
  console.log("API running on port " + PORT)
})