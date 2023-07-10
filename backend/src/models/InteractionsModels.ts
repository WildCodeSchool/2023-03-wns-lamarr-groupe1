import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne } from "typeorm";
import { Field, ObjectType, registerEnumType } from "type-graphql";
import { FilesModels } from "./FilesModels";
import { UsersModels } from "./UsersModels";

export enum InteractionType {
  Like = "like",
  Dislike = "dislike",
}

registerEnumType(InteractionType, {
  name: "InteractionType",
});

@ObjectType()
@Entity()
export class InteractionsModels extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field((type) => InteractionType)
  @Column()
  type!: InteractionType;

  @Field(() => FilesModels)
  @ManyToOne(() => FilesModels, (file) => file.interactions)
  file: FilesModels;

  @Field(() => UsersModels)
  @ManyToOne(() => UsersModels, (user) => user.interactions)
  user: UsersModels;
  
}
