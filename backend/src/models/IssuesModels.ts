import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BaseEntity,
  CreateDateColumn,
} from "typeorm";
import { Field, ObjectType, registerEnumType } from "type-graphql";
import { FilesModels } from "./FilesModels";
import { UsersModels } from "./UsersModels";

enum IssuesStatus {
  Open = "open",
  Pending = "pending",
  Close = "close",
}

registerEnumType(IssuesStatus, {
  name: "IssuesStatus",
});

@ObjectType()
@Entity()
export class IssuesModels extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  issue!: string;

  @Field()
  @CreateDateColumn()
  created_at!: Date;

  @Field()
  @Column()
  updated_at: Date;

  @Field((type) => IssuesStatus)
  @Column()
  status!: IssuesStatus;

  @Field(() => [FilesModels])
  @ManyToOne(() => FilesModels, (file) => file.issues)
  file: FilesModels;

  @Field(() => [UsersModels])
  @ManyToOne(() => UsersModels, (user) => user.issues)
  user: UsersModels;
}
