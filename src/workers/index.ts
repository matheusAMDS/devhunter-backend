import Job from "models/Job"
import CronCall from "models/CronCall"
import cron from "node-cron"

import { getAvailableJobs } from "./github-issues"

export function StartCron(): void {
  cron.schedule("16 * * * *", async () => {
    try {
      console.log("Start fetching jobs...")
      const lastCall = await CronCall.findOne({}).sort({ created_at: -1 })
      let searchedJobs
      
      if (lastCall) {
        searchedJobs = await getAvailableJobs(lastCall.createdAt as Date)
      } else {
        const newDate = new Date()
        const day = newDate.getDate()
        const month = newDate.getMonth() + 1
        const year = newDate.getFullYear()
        const since = new Date(`${month}/${day}/${year}`)
        
        searchedJobs = await getAvailableJobs(since)
      }
  
      await CronCall.create({})

      for (const job of searchedJobs) {
        const newJob = new Job({
          company: job.company,
          description: job.description,
          location: job.location,
          created_at: new Date(job.created_at),
          tags: [],
          title: job.title,
          work_regime: job.work_regime
        })

        job.tags.map(tag => {
          newJob.tags.push(tag)
        })

        await newJob.save()
      }
      console.log("Fetched all available jobs with success!")
    } catch (error) {
      console.log("Unable to fetch jobs")
      console.log(error)
    }
  })
}
