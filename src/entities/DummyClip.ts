import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class DummyClip extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @Column()
  name!: string;

  @Field(() => String)
  @Column()
  firstBead!: string;

  @Field(() => String)
  @Column()
  secondBead!: string;

  @Field(() => String)
  @Column()
  thirdBead!: string;

  @Field(() => String)
  @Column()
  highlight!: string;

  @Field(() => String)
  @Column()
  decoration!: string;
}
