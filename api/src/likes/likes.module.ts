import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import { LikesService } from "./likes.service";
import { LikesController } from "./likes.controller";
import { LikeEntity } from "./like.entity";
import { UserEntity } from "@/user/user.entity";
import { UserModule } from "@/user/user.module";
import { HttpModule } from "@nestjs/axios";

@Module({
  imports: [
    TypeOrmModule.forFeature([LikeEntity, UserEntity]),
    UserModule,
    HttpModule,
  ],
  providers: [LikesService],
  controllers: [LikesController],
  exports: [TypeOrmModule],
})
export class LikesModule {}
