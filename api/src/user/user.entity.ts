import { LikeEntity } from "@/likes/like.entity";
import { Exclude } from "class-transformer";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  login: string;

  @Column()
  @Exclude()
  password: string;

  @OneToMany(() => LikeEntity, (like) => like.user, {
    eager: true,
  })
  likes: LikeEntity[];
}
