import "dotenv/config"
import express from "express"

import { StartCron } from "workers"
import routes from "api"
import { PORT } from "config"

(async () => {
  await StartCron()

  const app = express()

  app.use(express.json())
  app.use(routes)

  app.listen(PORT, () => {
    console.log("API running on port " + PORT)
  })
})()