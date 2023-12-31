import { ExecutionContext, createParamDecorator } from "@nestjs/common";

export const GetLoggedUser = createParamDecorator(
	(data: string | undefined, ctx: ExecutionContext) => {
		const request = ctx.switchToHttp().getRequest()
		if (!data) return request.user

		return request.user[data]
	})
