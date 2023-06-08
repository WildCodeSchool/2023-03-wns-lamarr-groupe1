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
  is_public!: boolean;

  @BeforeInsert()
  setDefaultIsPublic(): void {
    this.is_public = true;
  }

  @Field()
  @CreateDateColumn()
  created_at!: Date;

  @Field()
  @Column({ nullable: true })
  updated_at: Date;

  @Field()
  @Column()
  nb_of_report!: number;

  @BeforeInsert()
  setDefaultNbOfReport(): void {
    this.nb_of_report = 0;
  }

  @Field()
  @Column()
  nb_of_download!: number;

  @BeforeInsert()
  setDefaultNbOfDownload(): void {
    this.nb_of_download = 0;
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
  user: UsersModels;

  @Field(() => [LanguageModels])
  @ManyToOne(() => LanguageModels, (language) => language.files)
  language: LanguageModels;
}