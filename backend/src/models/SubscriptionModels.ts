import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToOne,
  JoinColumn,
  BeforeInsert,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { UsersModels } from "./UsersModels";

@ObjectType()
@Entity()
export class SubscriptionModels extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  status!: string;

  @Field()
  @Column()
  subscribedAt!: Date;

  @Field()
  @Column()
  duration!: string;

  @OneToOne(() => UsersModels)
  @JoinColumn()
  user: UsersModels;

  @BeforeInsert()
  setDefaultStatus(): void {
    this.status = "inactive";
  }
}
