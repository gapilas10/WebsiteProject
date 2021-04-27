import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Field, Float, ObjectType } from "type-graphql";
import { Order } from "./Order";
import { Address } from "./Address";

@ObjectType()
@Entity()
export class Shipping extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  shippingMethod!: string;

  @Field(() => Float)
  @Column()
  shippingCharge!: number;

  @Field()
  @Column()
  city!: string;

  @Field(() => String)
  @Column()
  shippingDate!: Date;

  @ManyToOne(() => Address, (address) => address.shipping)
  address!: Address;

  @ManyToOne(() => Order, (order) => order.shippings)
  order!: Order;
}
