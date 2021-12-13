import { createParamDecorator, ExecutionContext, Request } from "@nestjs/common";
import { User } from "../auth/entity/user.entity";

export const GetUser = createParamDecorator((data, ctx:ExecutionContext): User => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
})