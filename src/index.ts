import "dotenv/config"
import { StartCron } from "workers"
import app from "api"
import { PORT } from "config"

(async () => {
  await StartCron()

  app.listen(PORT, () => {
    console.log("API running on port " + PORT)
  })
})()