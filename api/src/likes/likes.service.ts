import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { Repository } from "typeorm";
import { LikeEntity } from "./like.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "@/user/user.entity";
import { CreateLikeDto } from "./create-like.dto";
import { HttpService } from "@nestjs/axios";

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(LikeEntity) private readonly repo: Repository<LikeEntity>,
    private readonly httpService: HttpService,
  ) {}

  async create(user: UserEntity, dto: CreateLikeDto) {
    try {
      await this.httpService.axiosRef.get(
        `https://api.thecatapi.com/v1/images/${dto.catId}`,
      );
    } catch {
      throw new NotFoundException("Cat is not found");
    }

    const isExists = await this.repo.findOneBy({
      user: {
        id: user.id,
      },
      catId: dto.catId,
    });

    if (isExists) {
      throw new ConflictException("Already liked");
    }

    const like = this.repo.create({ user, ...dto });
    const saved = await this.repo.save(like);
    delete saved.user;

    return saved;
  }

  async remove(user: UserEntity, catId: string) {
    const like = await this.repo.findOneBy({
      user: {
        id: user.id,
      },
      catId,
    });

    if (!like) {
      throw new NotFoundException("Not liked");
    }

    await this.repo.remove(like);

    return;
  }
}
