import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn
} from "typeorm"
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class SubscriptionModels extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number

  @Field()
  @Column()
  status!: string

  @Field()
  @Column()
  type!: string

  @Field()
  @CreateDateColumn()
  subscribedAt!: Date

  @Field()
  @Column({ nullable: true })
  subscriptionEndedAt!: Date

  @Field()
  @Column({ nullable: true })
  duration: string
}
