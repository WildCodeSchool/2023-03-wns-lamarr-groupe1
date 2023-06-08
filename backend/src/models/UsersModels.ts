import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  OneToMany,
} from "typeorm";
import { IsInt } from "class-validator";
import { Field, ObjectType } from "type-graphql";
import { IssuesModels } from "./IssuesModels";
import { ContactModels } from "./ContactModels";
import { CommentsModels } from "./CommentsModels";
import { ReportsModels } from "./ReportsModels";
import { InteractionsModels } from "./InteractionsModels";
import { FilesModels } from "./FilesModels";

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
    this.role = "invited";
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

  @Field(() => [IssuesModels])
  @OneToMany(() => IssuesModels, (issue) => issue.user)
  issues: IssuesModels[];

  @Field(() => [ContactModels])
  @OneToMany(() => ContactModels, (contact) => contact.user)
  contacts: ContactModels[];

  @Field(() => [CommentsModels])
  @OneToMany(() => CommentsModels, (comment) => comment.user)
  comments: CommentsModels[];

  @Field(() => [ReportsModels])
  @OneToMany(() => ReportsModels, (report) => report.user)
  reports: ReportsModels[];

  @Field(() => [InteractionsModels])
  @OneToMany(() => InteractionsModels, (interaction) => interaction.user)
  interactions: InteractionsModels[];

  @Field(() => [FilesModels])
  @OneToMany(() => FilesModels, (file) => file.user)
  files: FilesModels[];
}
