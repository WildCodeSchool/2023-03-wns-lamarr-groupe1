import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BaseEntity,
  ManyToOne,
  BeforeInsert,
  CreateDateColumn,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { IssuesModels } from "./IssuesModels";
import { CommentsModels } from "./CommentsModels";
import { ReportsModels } from "./ReportsModels";
import { InteractionsModels } from "./InteractionsModels";
import { UsersModels } from "./UsersModels";
import { LanguageModels } from "./LanguageModels";

@ObjectType()
@Entity()
export class FilesModels extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  filename!: string;

  @Field()
  @Column({ nullable: true })
  content: string;

  @Field()
  @Column()
  isPublic!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @CreateDateColumn()
  updatedAt!: Date;

  @Field()
  @Column()
  nbOfReport: number;

  @BeforeInsert()
  setDefaultNbOfReport(): void {
    this.nbOfReport = 0;
  }

  @Field()
  @Column()
  nbOfDownload: number;

  @BeforeInsert()
  setDefaultNbOfDownload(): void {
    this.nbOfDownload = 0;
  }

  @Field(() => [IssuesModels])
  @OneToMany(() => IssuesModels, (issue) => issue.file)
  issues: IssuesModels[];

  @Field(() => [CommentsModels])
  @OneToMany(() => CommentsModels, (comment) => comment.file)
  comments: CommentsModels[];

  @Field(() => [ReportsModels])
  @OneToMany(() => ReportsModels, (report) => report.file)
  reports: ReportsModels[];

  @Field(() => [InteractionsModels])
  @OneToMany(() => InteractionsModels, (interaction) => interaction.file)
  interactions: InteractionsModels[];

  @Field(() => [UsersModels])
  @ManyToOne(() => UsersModels, (user) => user.files)
  user!: UsersModels;

  @Field(() => [LanguageModels])
  @ManyToOne(() => LanguageModels, (language) => language.files)
  language!: LanguageModels;
}