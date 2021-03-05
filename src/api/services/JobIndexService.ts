import { PrismaClient } from "@prisma/client"

const PAGE_SIZE = 12

export interface JobIndexParams {
  page?: number
  tech?: string
  location?: string
}

export async function JobIndexService(params: JobIndexParams) {
  const { page=0, tech, location } = params
  const client = new PrismaClient()
  const jobs = await client.job.findMany({
    take: PAGE_SIZE,
    skip: PAGE_SIZE * page,
    orderBy: {
      created_at: 'desc'
    },
    where: {
      location: location || undefined,
      tags: {
        contains: tech || undefined
      }
    },
  })

  await client.$disconnect()

  return {
    jobs,
    page
  }
}