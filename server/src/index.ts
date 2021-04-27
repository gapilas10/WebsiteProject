import "reflect-metadata";
import "dotenv-safe/config";
import { createConnection } from "typeorm";
import { COOKIE_NAME, __prod__ } from "./constants";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { ProductResolver } from "./resolvers/product";
import { Product } from "./entities/Product";
import { User } from "./entities/User";
import path from "path";
import { UserResolver } from "./resolvers/user";
import Redis from "ioredis";
import connectRedis from "connect-redis";
import session from "express-session";
import cors from "cors";
import { Address } from "./entities/Address";
import { CartItem } from "./entities/CartItem";
import { CreditCard } from "./entities/CreditCard";
import { Order } from "./entities/Order";
import { Payment } from "./entities/Payment";
import { Shipping } from "./entities/Shipping";
import { ProductDetails } from "./entities/ProductDetails";

const main = async () => {
  const conn = await createConnection({
    type: "postgres",
    username: "postgres",
    password: "postgres",
    logging: true,
    migrations: [path.join(__dirname, "./migrations/*")],
    synchronize: false,
    entities: [
      Product,
      User,
      Address,
      CartItem,
      CreditCard,
      Order,
      Payment,
      Product,
      ProductDetails,
      Shipping,
    ],
  });
  //await conn.runMigrations();
  //console.log(conn);

  const app = express();

  const RedisStore = connectRedis(session);
  const redis = new Redis(process.env.REDIS_URL);
  app.set("trust proxy", 1);
  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );
  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({
        client: redis,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
        httpOnly: true,
        sameSite: "lax", // csrf
        secure: __prod__, // cookie only works in https
      },
      saveUninitialized: false,
      secret: process.env.SESSION_SECRET,
      resave: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [ProductResolver, UserResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({
      req,
      res,
      redis,
    }),
  });

  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  app.listen(parseInt(process.env.PORT), () => {
    console.log("server started on localhost:4000");
  });
};

main().catch((err) => {
  console.error(err);
});
