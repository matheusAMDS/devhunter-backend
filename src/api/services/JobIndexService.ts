import Job from "models/Job"

const PAGE_SIZE = 12

interface Query {
  location?: string
  tags?: {
    $in: string[]
  }
}

export interface JobIndexParams {
  page?: number
  tech?: string[]
  location?: string
}

export async function JobIndexService(params: JobIndexParams) {
  const { page=0, tech, location } = params
  let query: Query = {}

  if (tech)
    query.tags = {
      $in: tech
    }

  if (location)
    query.location = location

  const jobs = await Job
    .find(query)
    .sort({ created_at: -1 })
    .skip(page * PAGE_SIZE)
    .limit(PAGE_SIZE)

  return {
    jobs,
    page
  }
}