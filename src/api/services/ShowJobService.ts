import { PrismaClient } from "@prisma/client"

export interface ShowJobParams {
  id: string
}

export async function ShowJobService(params: ShowJobParams) {
  const client = new PrismaClient()
  const data = await client.job.findFirst({
    where: { 
      id: params.id 
    }
  })
  
  if (data) {
    const job = {
      ...data,
      tags: data.tags.split(',')
    }

    return job
  } else {
    return null 
  }
}