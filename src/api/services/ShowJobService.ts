import Job from "models/Job"

export interface ShowJobParams {
  id: string
}

export async function ShowJobService(params: ShowJobParams) {
  const data = await Job.findById(params.id)
  
  return data
}