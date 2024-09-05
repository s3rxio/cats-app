import { UserEntity } from "@/user/user.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("likes")
export class LikeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  catId: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.likes, {
    nullable: false,
  })
  user: UserEntity;
}
