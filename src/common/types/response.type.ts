import { HttpStatus } from "@nestjs/common";

export type Response<T> = {
	statusCode: HttpStatus,
	message: string,
	body: T
}
