import { BaseEntity, BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IsInt  } from 'class-validator';
import { Field, ObjectType } from "type-graphql";
import { IsUnique } from "../inputs/IsUniqueValidator";


@ObjectType()
@Entity()
export class UsersModels extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  firstname: string;

  @Field()
  @Column()
  lastname: string;

  @Field()
  @Column()
  @IsUnique('username', { message: 'Le noms d\'utilisateur choisi éxiste déjà. Merci d\'en choisir un autre'})
  username!: string;

  @Field()
  @Column()
  @IsUnique('email', { message: 'L\'email choisi éxiste déjà. Merci d\'en choisir un autre'})
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
