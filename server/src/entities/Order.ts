import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Field, Float, ObjectType } from "type-graphql";
import { User } from "./User";
import { Payment } from "./Payment";
import { Shipping } from "./Shipping";
import { ProductDetails } from "./ProductDetails";

@ObjectType()
@Entity()
export class Order extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  status!: string;

  @Field(() => Float)
  @Column()
  total!: number;

  @Field()
  @Column()
  created!: string;

  @Field()
  @Column()
  modified!: string;

  @OneToMany(() => ProductDetails, (productDetails) => productDetails)
  productsDetails: ProductDetails[];

  @OneToMany(() => Payment, (payment) => payment.order)
  payments: Payment[];

  @OneToMany(() => Shipping, (shipping) => shipping.order)
  shippings: Shipping[];

  @ManyToOne(() => User, (user) => user.orders)
  user: User;
}
