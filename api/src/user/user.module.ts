import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./user.entity";
import { JwtModule } from "@nestjs/jwt";
import { LikeEntity } from "@/likes/like.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, LikeEntity]),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.SECRET,
        global: true,
      }),
    }),
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService, TypeOrmModule, JwtModule],
})
export class UserModule {}
