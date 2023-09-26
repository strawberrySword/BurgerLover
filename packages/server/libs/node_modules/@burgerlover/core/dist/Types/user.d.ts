import { HttpStatus } from "@nestjs/common";
import { BaseResponse } from "./base";
export declare class UserInfoDto {
    userName: string;
    avatar: string;
}
export declare class SignUpRequestDto extends UserInfoDto {
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
