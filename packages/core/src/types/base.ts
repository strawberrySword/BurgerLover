import { HttpStatus } from "@nestjs/common";
export interface BaseResponse {
	message: string;
	status: HttpStatus;
}
