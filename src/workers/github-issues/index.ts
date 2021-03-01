import axios from "axios"
import { Job, RepoIssue, RepoInfo } from "./types"
import repos from "./repositories.json"
import getMatchedRegex from "../utils/getMatchedRegex"

const api = axios.create({
  baseURL: "https://api.github.com/repos"
}) 

async function getDataByIssues(repos: RepoInfo[], since: Date) {
  const calls = repos.map(repoInfo => {
    const { org, repo } = repoInfo
    const repoIssuesUrl = `/${org}/${repo}/issues`
    
    return api.get<RepoIssue[]>(repoIssuesUrl, {
      params: { state: 'open', since }
    })
  })

  const responses = await Promise.all(calls)
  let totalData: RepoIssue[] = []

  responses.forEach(response => {
    const data = response.data
    const filteredData = data.filter(issue => {
      const createdAt = new Date(issue.created_at)

      return createdAt.getTime() > since.getTime()
    })

    totalData = totalData.concat(filteredData)
  })

  return totalData
}

function convertIssueToJob(issue: RepoIssue): Job | null {
  const location = getMatchedRegex({ 
    regex: /\[(.+)\]/, 
    str: issue.title
  })
  const company = getMatchedRegex({ 
    regex: /@\s*(.+)|na (.+)|no (.+)/,
    str: issue.title,
    groups: 3
  })
  const title = getMatchedRegex({ 
    regex: /]\s*(.+) @|]\s*(.+) na|]\s*(.+) no/,
    str: issue.title,
    groups: 3
  })

  const workRegime = issue.labels.find(label => {
    return label.name === 'CLT' || label.name === 'PJ'
  })
  
  if (title && company && location && workRegime) {
    return {
      id: String(issue.id),
      title: title.trim(),
      location: location.trim(),
      company: company.trim(),
      company_logo: null,
      company_url: null,
      description: issue.body,
      created_at: issue.created_at,
      tags: issue.labels.map(label => label.name),
      work_regime: workRegime.name
    }
  } else {
    return null
  }
}

export async function getAvailableJobs(since: Date | number): Promise<Job[]> {
  since = typeof since === 'number' ? new Date(since) : since 
  
  const issues = await getDataByIssues(repos, since)
  const jobs = issues
    .map(issue => convertIssueToJob(issue))
    .filter(job => !!job)

  return jobs as Job[]
}