import "reflect-metadata";
import { createConnection } from "typeorm";
import { __prod__ } from "./constants";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { DummyClipResolver } from "./resolvers/dummyclip";
import { DummyClip } from "./entities/DummyClip";
import { User } from "./entities/User";
import path from "path";

const main = async () => {
  const conn = await createConnection({
    type: "postgres",
    database: "hand_crafted_with_love",
    username: "postgres",
    password: "postgres",
    port: 5432,
    logging: true,
    synchronize: true,
    migrations: [path.join(__dirname, "./migrations/*")],
    entities: [DummyClip, User],
  });
  await conn.runMigrations();

  const app = express();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [DummyClipResolver],
      validate: false,
    }),
  });

  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log("server started on localhost:4000");
  });
};

main().catch((err) => {
  console.error(err);
});
