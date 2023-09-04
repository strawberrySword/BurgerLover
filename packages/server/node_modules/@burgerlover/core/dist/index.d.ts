import { HttpStatus } from "@nestjs/common";
import { BaseResponse } from "./types/base";
export interface UserInfoDto {
    userName: string;
    avatar: string;
    id: number;
}
export interface CreateUserRequestDto extends Omit<UserInfoDto, "id"> {
    password: string;
}
export type CreateUserResponseDto = CreateUserSuccessResponseDto | CreateUserFailedResponseDto;
interface CreateUserSuccessResponseDto extends BaseResponse, UserInfoDto {
    status: 201;
}
interface CreateUserFailedResponseDto extends BaseResponse {
    status: Exclude<HttpStatus, HttpStatus.CREATED>;
}
export {};
//# sourceMappingURL=index.d.ts.map