import { JobIndexParams, JobIndexService } from "api/services/JobIndexService"
import { ShowJobService, ShowJobParams } from "api/services/ShowJobService"
import { intArg, queryType, stringArg } from "nexus"
import { Job, JobIndexResult } from "./types/job"

export const Query = queryType({
  definition(t) {
    t.field('jobs', {
      type: JobIndexResult,
      args: {
        page: intArg(),
        location: stringArg(),
        tech: stringArg()
      },
      async resolve(_, { page, tech, location }) {
        const jobs = await JobIndexService({ 
          page: page || 0,
          tech: tech?.split(','),
          location: location as string
        })

        return jobs
      }
    }),
    t.field('job', {
      type: Job,
      args: {
        id: stringArg()
      },
      async resolve(_, args) {
        const job = await ShowJobService(args as ShowJobParams)

        return job
      }
    })
  }
})