import { JobIndexParams, JobIndexService } from "api/services/JobIndexService"
import { intArg, nonNull, queryType } from "nexus"
import { Job, JobIndexResult } from "./types/job"

export const Query = queryType({
  definition(t) {
    t.field('jobs', {
      type: JobIndexResult,
      args: {
        page: intArg()
      },
      async resolve(_, args) {
        const jobs = await JobIndexService(args as JobIndexParams)

        return jobs
      }
    })
  }
})