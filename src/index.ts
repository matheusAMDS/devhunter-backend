import "dotenv/config"
import cron from "node-cron"
import express from "express"
import { PrismaClient } from "@prisma/client"

import { getAvailableJobs } from "workers/github-issues"
import routes from "api"
import { PORT } from "config"

cron.schedule("* */1 * * *", async () => {
  try {
    console.log("Start fetching jobs...")
    const client = new PrismaClient()
    const lastCall = await client.cronCall.findFirst({ 
      orderBy: {
        called_at: 'desc'
      }
    })
    let searchedJobs
    
    if (lastCall) {
      searchedJobs = await getAvailableJobs(lastCall.called_at)
    } else {
      const newDate = new Date()
      const day = newDate.getDate()
      const month = newDate.getMonth() + 1
      const year = newDate.getFullYear()
      const since = new Date(`${month}/${day}/${year}`)
      
      searchedJobs = await getAvailableJobs(since)
    }

    await client.cronCall.create({
      data: {}
    })
    searchedJobs.forEach(async job => {
      await client.job.create({
        data: {
          ...job,
          id: undefined,
          tags: job.tags.toString()
        }
      })
    })
    console.log("Fetched all available jobs with success!")
  } catch (error) {
    console.log("Unable to fetch jobs")
    console.log(error)
  }
})

const app = express()

app.use(express.json())
app.use(routes)

app.listen(PORT, () => {
  console.log("API running on port " + PORT)
})