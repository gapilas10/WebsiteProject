import { Post } from "src/entities/Post";
import { Resolver, Query} from "type-graphql";

@Resolver()
export class PostResolver{
    @Query(() => [Post])
    async posts(): Promise<Post[]> {
        return Post.find();
    }

    // @Query(() => Post, {nullable:true})
    // post(
    //     @Arg('id', () => Int) id: number,
    //     @Ctx() { em }: MyContext): Promise<Post | undefined> {
    //     return Post.findOne(id);
    // }
}