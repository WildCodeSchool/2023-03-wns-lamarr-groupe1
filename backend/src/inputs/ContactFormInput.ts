import { PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";
import { Field, InputType } from "type-graphql";
import { IsEmail, Length } from "class-validator";

@InputType()
export class ContactFormInput {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name!: string;

  @Field()
  @IsEmail()
  email!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @Field()
  @Column()
  @Length(1, 800)
  content!: string;
}
