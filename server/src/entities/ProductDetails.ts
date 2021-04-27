import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { Order } from "./Order";
import { Product } from "./Product";

@ObjectType()
@Entity()
export class ProductDetails extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  customisation!: string;

  @Field()
  @Column()
  quantity!: number;

  @OneToOne(() => Product)
  @JoinColumn()
  product!: Product;

  @ManyToOne(() => Order, (order) => order.productsDetails)
  order!: Order;
}
