import { HttpStatus } from "@nestjs/common";

export class BaseResponse {
	message: string;
	status: HttpStatus;
}
