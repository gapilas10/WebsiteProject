import { Field, InputType } from "type-graphql";

@InputType()
export class CreateDummyClipInput {
  @Field()
  name: string;

  @Field()
  firstBead: string;

  @Field()
  secondBead: string;

  @Field()
  thirdBead: string;

  @Field()
  highlight: string;

  @Field()
  decoration: string;
}
