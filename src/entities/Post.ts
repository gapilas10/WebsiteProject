import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Post extends BaseEntity{
    @Field()
    @PrimaryGeneratedColumn()
    id!: number;

    @Field()
    @Column()
    title!: string;  

    @Field(() => String)
    @CreateDateColumn()
    createdAt:  Date;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: Date;    
}