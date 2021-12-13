import { createParamDecorator, ExecutionContext, Request } from "@nestjs/common";
import { User } from "../auth/entity/user.entity";

export const GetToken = createParamDecorator((data, ctx:ExecutionContext): User => {
    const req = ctx.switchToHttp().getRequest();
    const {headers} = req;
    const resultToken = headers.authorization.split('Bearer ')[1];
    return resultToken;
})