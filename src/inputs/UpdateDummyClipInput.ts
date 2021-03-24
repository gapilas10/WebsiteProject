import { Field, InputType } from "type-graphql";

@InputType()
export class UpdateDummyClipInput {
    @Field({ nullable: true })
    name?: string;
    
    @Field({ nullable: true })
    firstBead?: string;

    @Field({ nullable: true })
    secondBead?: string;

    @Field({ nullable: true })
    thirdBead?: string;

    @Field({ nullable: true })
    highlight?: string;

    @Field({ nullable: true })
    decoration?: string;
}