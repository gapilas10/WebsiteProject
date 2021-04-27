import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { User } from "./User";
import { Payment } from "./Payment";

@ObjectType()
@Entity()
export class CreditCard extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  creditCardNumber!: string;

  @Field()
  @Column()
  cardHolderName!: string;

  @Field(() => String)
  @Column()
  expiryDate!: Date;

  @OneToMany(() => Payment, (payment) => payment.creditCard)
  payments!: Payment[];

  @ManyToOne(() => User, (user) => user.creditCards)
  user!: User;
}
