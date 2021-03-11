import { objectType } from "nexus"

export const JobIndexResult = objectType({
  name: 'JobIndexResult',
  definition(t) {
    t.list.field('jobs', { type: Job })
    t.int('page')
  }
})

export const Job = objectType({
  name: 'Job',
  definition(t) {
    t.id('id')
    t.string('title')
    t.string('description')
    t.string('company')
    t.string('issue_id')
    t.string('location')
    t.string('work_regime')
    t.list.string('tags')
    t.field('created_at', { type: "DateTime" })
    t.field('updated_at', { type: "DateTime" })
  }
})