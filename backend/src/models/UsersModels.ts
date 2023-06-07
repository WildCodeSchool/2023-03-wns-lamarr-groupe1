import { BaseEntity, BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";
import { IsInt  } from 'class-validator';
import { Field, ObjectType } from "type-graphql";


@ObjectType()
@Entity()
@Unique(["username", "email"])
export class UsersModels extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  firstname!: string;

  @Field()
  @Column()
  lastname!: string;

  @Field()
  @Column()
  username!: string;

  @Field()
  @Column()
  email!: string;

  @Field()
  @Column()
  password!: string;

  @Field()
  @Column()
  role!: string;

  @BeforeInsert()
  setDefaultRole(): void {
    this.role = 'invited';
  }

  @Column()
  @IsInt()
  executedcode!: number;

  @BeforeInsert()
  setDefaultExecutedCode(): void {
    this.executedcode = 0;
  }

  @CreateDateColumn()
  created_at!: Date;
}
