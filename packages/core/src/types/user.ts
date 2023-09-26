import { HttpException, HttpStatus } from "@nestjs/common";
import { BaseResponse } from "./base";
import { IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UserInfoDto {
	@IsString()
	@ApiProperty()
	userName: string;
	@IsString()
	@ApiProperty()
	avatar: string;
}

export class SignUpRequestDto extends UserInfoDto {
	@IsString()
	@ApiProperty()
	password: string;
}

export interface CreateUserResponseDto extends BaseResponse, UserInfoDto {
	id: string;
	status: HttpStatus.CREATED;
}

export interface SearchUserResponseDto extends BaseResponse, UserInfoDto {
	id: string;
	status: HttpStatus.OK;
}
