import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Field, ID, Int, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: string;

  @Field(() => String)
  @Column()
  firstname!: string;

  @Field(() => String)
  @Column()
  lastname!: string;

  @Field(() => String)
  @Column()
  address!: string;

  @Field(() => Int)
  @Column()
  telephone!: number;

  @Field(() => String)
  @Column({ unique: true })
  username!: string;

  @Field()
  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;
}
