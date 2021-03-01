import { ApolloServer } from "apollo-server-express"
import express from "express"

import schema from "./schema"

const app = express()
const server = new ApolloServer({
  schema
})

server.applyMiddleware({ app })

export default app