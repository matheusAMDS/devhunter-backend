import { PrismaClient } from "@prisma/client"
import cron from "node-cron"

import { getAvailableJobs } from "./github-issues"

export async function StartCron(): Promise<void> {
  return new Promise((resolve, reject) => {
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
        resolve()
      } catch (error) {
        console.log("Unable to fetch jobs")
        console.log(error)
        reject()
      }
    })
  })
}