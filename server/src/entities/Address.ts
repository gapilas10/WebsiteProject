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
import { Shipping } from "./Shipping";

@ObjectType()
@Entity()
export class Address extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  fullname!: string;

  @Field()
  @Column()
  address!: string;

  @Field()
  @Column()
  postcode!: string;

  @Field()
  @Column()
  city!: string;

  @Field()
  @Column()
  phone!: number;

  @OneToMany(() => Shipping, (shipping) => shipping.address)
  shipping: Shipping;

  @ManyToOne(() => User, (user) => user.addresses)
  user: User;
}
