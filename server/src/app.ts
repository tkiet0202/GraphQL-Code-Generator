import fs from "fs";
import path from "path";
import express from "express";
import { graphqlHTTP } from "express-graphql";
import { makeExecutableSchema } from "@graphql-tools/schema";
import db from "./db"; //TODO -replace dummy data by prisma + (local sqlite
import resolvers from "./resolvers";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const schema = makeExecutableSchema({
  typeDefs: fs.readFileSync(
    path.join(__dirname, "..", "..", "schema", "schema.gql"),
    "utf-8"
  ),
  resolvers,
});

app.use(
  "/graphql",
  graphqlHTTP({
    context: { db },
    schema,
    graphiql: true,
  })
);

module.exports = app;

export default app;
