export interface RepoInfo {
  org: string 
  repo: string
}

interface RepoIssueLabel {
  id: string
  name: string
}

type RepoIssueState = 'open' | 'closed'

export interface RepoIssue {
  url: string
  repository_url: string
  labels_url: string
  html_url: string
  id: number,
  node_id: string
  title: string
  labels: RepoIssueLabel[]
  state: RepoIssueState,
  created_at: Date
  updated_at: Date
  closed_at: Date | null,
  body: string
}

export interface Job {
  id: string 
  created_at: Date 
  company: string 
  company_url: string | null 
  company_logo: string | null 
  location: string 
  title: string 
  description: string 
  tags: string[]
  work_regime: string
}