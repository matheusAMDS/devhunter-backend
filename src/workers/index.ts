import cron from "node-cron"

import Job from "../models/Job"
import CronCall from "../models/CronCall"
import { getAvailableJobs } from "./github-issues"
import { generateTodayDate } from "./utils"

export function StartCron(): void {
  cron.schedule("30 * * * *", async () => {
    try {
      console.log("Start fetching jobs...")
      const lastCall = await CronCall.findOne({}).sort({ created_at: -1 })
      let searchedJobs
      
      if (lastCall) 
        searchedJobs = await getAvailableJobs(lastCall.createdAt as Date)
      else {
        const since = generateTodayDate()

        searchedJobs = await getAvailableJobs(since)
      }
  
      await CronCall.create({})

      for (const job of searchedJobs) {
        await Job.findOneAndUpdate(
          { issue_id: job.issue_id}, 
          job, 
          { upsert: true }
        )
      }
      console.log("Fetched all available jobs with success!")
    } catch (error) {
      console.log("Unable to fetch jobs")
      console.log(error)
    }
  })
}
