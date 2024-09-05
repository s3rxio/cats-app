import { Me } from "@/common/decorators";
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from "@nestjs/common";
import { LikeEntity } from "./like.entity";
import { UserAuthGuard } from "@/user/user-auth.guard";
import { CreateLikeDto } from "./create-like.dto";
import { UserEntity } from "@/user/user.entity";
import { LikesService } from "./likes.service";

@Controller("likes")
@UseGuards(UserAuthGuard)
export class LikesController {
  constructor(private readonly service: LikesService) {}

  @Get()
  findAll(@Me("likes") likes: LikeEntity[]) {
    return likes;
  }

  @Post()
  create(@Me() user: UserEntity, @Body() dto: CreateLikeDto) {
    return this.service.create(user, dto);
  }

  @Delete(":catId")
  remove(@Me() user: UserEntity, @Param("catId") catId: string) {
    return this.service.remove(user, catId);
  }
}
