import { makeSchema } from "nexus"
import path from "path"
import { NODE_ENV } from "config"

import { Query } from "./query"
import * as types from "./types"

export default makeSchema({
  types: { ...types, Query },
  shouldGenerateArtifacts: NODE_ENV === 'development',
  outputs: {
    schema: path.join(__dirname, 'generated/schema.gen.graphql'),
    typegen: path.join(__dirname, 'generated/nexusTypes.gen.ts'),
  }
})