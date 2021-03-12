import { GraphQLDateTime } from "graphql-iso-date"
import { decorateType } from "nexus"

export const DateTime = decorateType(GraphQLDateTime, {
  sourceType: 'DateTime',
  asNexusMethod: 'datetime'
})

