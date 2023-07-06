import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToOne,
  JoinColumn,
  BeforeInsert,
  CreateDateColumn
} from "typeorm"
import { Field, ObjectType } from "type-graphql";
import { UsersModels } from "./UsersModels";

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
  @CreateDateColumn()
  subscribedAt!: Date

  @Field()
  @Column({ nullable: true })
  subscriptionEndedAt!: Date

  @Field()
  @Column({ nullable: true })
  duration: string

  @OneToOne(() => UsersModels)
  @JoinColumn()
  user: UsersModels

  @BeforeInsert()
  setDefaultStatus(): void {
    this.status = "Inactive"
  }
}
