import { PrismaClient } from "@prisma/client"

const PAGE_SIZE = 12

export interface JobIndexParams {
  page?: number
}

export async function JobIndexService(params: JobIndexParams) {
  const page = params.page || 0
  const client = new PrismaClient()
  const data = await client.job.findMany({
    skip: PAGE_SIZE * page,
    take: PAGE_SIZE,
    orderBy: {
      created_at: 'desc'
    }
  })
  const jobs = data.map(job => ({
    ...job,
    tags: job.tags.split(',')
  }))

  return {
    jobs,
    page
  }
}