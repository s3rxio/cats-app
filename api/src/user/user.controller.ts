import { Body, Controller, Post, Res } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./create-user.dto";
import { Response } from "express";

@Controller("user")
export class UserController {
  constructor(private readonly service: UserService) {}

  @Post()
  async auth(@Body() dto: CreateUserDto, @Res() res: Response) {
    const user = await this.service.auth(dto);

    return res
      .set({
        "X-Auth-Token": await this.service.generateAccessToken(user.id),
      })
      .json(user);
  }
}
