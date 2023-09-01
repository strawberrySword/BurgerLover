import { createContext } from "react";
import { UserDto } from "../dto/user.dto";

type UserContext = [user: UserDto, setUser: React.Dispatch<React.SetStateAction<UserDto>>]

export const SignedUser = createContext<UserContext>([{
    userName: "",
    avatar: "",
    token: "",
}, () => { }]);