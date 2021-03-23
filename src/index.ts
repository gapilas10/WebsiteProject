import "reflect-metadata";
import { createConnection } from 'typeorm';
import { __prod__ } from "./constants";
import express from 'express';
import {ApolloServer} from 'apollo-server-express';
import {buildSchema} from 'type-graphql';
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";
import { Post } from './entities/Post';

const main = async () =>{ 
    const conn = await createConnection({
        type: 'postgres',
        database: 'hand_crafted_with_love2',
        username: 'postgres',
        password: 'postgres',
        logging: true,
        synchronize: true,
        entities: [Post]
    });

    console.log(conn.isConnected);

    const app = express();

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [HelloResolver, PostResolver],
            validate: false,
        }),
        
    });

    apolloServer.applyMiddleware({ app });
    
    app.listen(4000, () => {
        console.log('server started on localhost:4000')
    })
};

main().catch((err) => {
    console.error(err);
});
