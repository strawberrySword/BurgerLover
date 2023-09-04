import { BaseResponse } from "./base";

export interface UserInfoDto {
	userName: string;
	avatar: string;
	id: number;
}

export interface CreateUserRequestDto extends Omit<UserInfoDto, "id"> {
	password: string;
}

export interface CreateUserResponseDto extends BaseResponse, UserInfoDto {}
