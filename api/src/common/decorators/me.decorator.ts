import { UserEntity } from "@/user/user.entity";
import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export type UserKeys = keyof UserEntity;
export type MeValue = UserKeys | UserKeys[] | null;

export const Me = createParamDecorator(
  (value: MeValue, ctx: ExecutionContext) => {
    const { user } = ctx.switchToHttp().getRequest();

    if (Array.isArray(value)) {
      return value.reduce((acc: Partial<UserEntity>, curr) => {
        acc[curr] = user[curr] as never;
        return acc;
      }, {});
    }

    return value ? user[value] : user;
  },
);
