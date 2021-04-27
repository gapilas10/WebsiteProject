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
import { User } from "./User";
import { ProductDetails } from "./ProductDetails";

@ObjectType()
@Entity()
export class CartItem extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  quantity!: string;

  @Field(() => String)
  @Column()
  timeAdded!: Date;

  @OneToOne(() => ProductDetails)
  @JoinColumn()
  productDetails!: ProductDetails;

  @ManyToOne(() => User, (user) => user.cartItems)
  user!: User;
}
