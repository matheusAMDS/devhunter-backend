import "dotenv/config"
import { StartCron } from "workers"
import app from "api"
import { PORT } from "config"

(async () => {
  StartCron()

  app.listen(PORT, () => {
    console.log("API running on port " + PORT)
  })
})()