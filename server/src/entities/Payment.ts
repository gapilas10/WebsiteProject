import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { CreditCard } from "./CreditCard";
import { Order } from "./Order";

@ObjectType()
@Entity()
export class Payment extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  quantity!: string;

  @Field(() => String)
  @Column()
  timeAdded!: Date;

  @ManyToOne(() => CreditCard, (creditcard) => creditcard.payments)
  creditCard!: CreditCard;

  @ManyToOne(() => Order, (order) => order.payments)
  order!: Order;
}
