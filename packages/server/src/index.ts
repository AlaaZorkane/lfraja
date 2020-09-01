import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "apollo-server";
import path from "path";
import { ReqContext } from "./types";
import { PrismaClient } from "@prisma/client";
import { PostCrudResolver } from "@generated/type-graphql";

async function main() {
  const schema = await buildSchema({
    resolvers: [PostCrudResolver],
    emitSchemaFile: path.resolve(__dirname, "./generated-schema.graphql"),
    validate: false,
  });

  const prisma = new PrismaClient();

  const server = new ApolloServer({
    schema,
    playground: true,
    context: (): ReqContext => ({ prisma }),
  });
  const { port } = await server.listen(4000);
  console.log(`GraphQL is listening on ${port}!`);
}

main().catch(console.error);
