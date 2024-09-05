import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./user.entity";
import { FindOptionsWhere, Repository } from "typeorm";
import { CreateUserDto } from "./create-user.dto";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private readonly repo: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  findOneBy(...where: FindOptionsWhere<UserEntity>[]) {
    return this.repo.findOneBy(where);
  }

  async findOneByOrThrow(...where: FindOptionsWhere<UserEntity>[]) {
    const user = await this.findOneBy(...where);

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  async create(dto: CreateUserDto) {
    const { login, password, ...rest } = dto;

    const isExists = await this.findOneBy({ login });

    if (isExists) {
      throw new ConflictException("User already exists");
    }

    const hashedPassword = await this.hashPassword(password);

    const user = this.repo.create({ login, password: hashedPassword, ...rest });

    return this.repo.save(user);
  }

  async register(dto: CreateUserDto) {
    const user = await this.create(dto);

    return user;
  }

  async hashPassword(password: string) {
    const salt = await bcrypt.genSalt(Number(process.env.SECRET_SALT) || 10);

    return bcrypt.hash(password, salt);
  }

  async generateAccessToken(id: number) {
    return this.jwtService.signAsync({ id });
  }

  extractPayloadFromToken(token: string) {
    return this.jwtService.verifyAsync<{ id: number }>(token);
  }
}
