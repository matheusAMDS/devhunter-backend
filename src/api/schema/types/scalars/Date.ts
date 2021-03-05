/* import { scalarType } from 'nexus'
import { Kind } from 'graphql/language'

export default scalarType({
  name: 'Date',
  description: 'Date custom scalar type',
  parseValue(value: number) {
    return new Date(value)
  },
  serialize(value) {
    return value.getTime() // value sent to the client
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return parseInt(ast.value, 10) // ast value is always in string format
    }
    return null
  },
}) */
import { GraphQLDateTime } from "graphql-iso-date"
import { decorateType } from "nexus"

export const DateTime = decorateType(GraphQLDateTime, {
  sourceType: 'DateTime',
  asNexusMethod: 'datetime'
})

