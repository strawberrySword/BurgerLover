export interface NewUserDetailsDto {
  userName: string;
  password: string;
  confirmPassword?: string;
  avatar: string;
}

export interface UserDto {
  userName: string;
  avatar: string;
  token: string;
}
