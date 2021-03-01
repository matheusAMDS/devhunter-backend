import { makeSchema } from "nexus"
import path from "path"
import { NODE_ENV } from "config"

import { Query } from "./query"
import { Job, JobIndexResult } from "./types/job"

export default makeSchema({
  types: [Query, Job, JobIndexResult],
  shouldGenerateArtifacts: NODE_ENV === 'development',
  outputs: {
    schema: path.join(__dirname, 'generated/schema.gen.graphql'),
    typegen: path.join(__dirname, 'generated/nexusTypes.gen.ts'),
  }
})