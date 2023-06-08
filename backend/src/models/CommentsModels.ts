import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  CreateDateColumn,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { FilesModels } from "./FilesModels";
import { UsersModels } from "./UsersModels";

@ObjectType()
@Entity()
export class CommentsModels extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  comment!: string;

  @Field()
  @CreateDateColumn()
  created_at!: Date;

  @Field()
  @Column()
  updated_at: Date;

  @Field(() => [FilesModels])
  @ManyToOne(() => FilesModels, (file) => file.comments)
  file: FilesModels;

  @Field(() => [UsersModels])
  @ManyToOne(() => UsersModels, (user) => user.comments)
  user: UsersModels;
}
