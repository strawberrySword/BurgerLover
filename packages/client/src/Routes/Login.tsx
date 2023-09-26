import React, { useState, useContext, useEffect, useLayoutEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { NewUserDetailsDto } from '../dto/user.dto'
import Loading from "../Components/Loading"

import { SignedUser } from '../Context/user.context';
import { SearchUserResponseDto } from '@burgerlover/core';

const Login = () => {
    const navigate = useNavigate()
    const [signedUser, setSignedUser] = useContext(SignedUser);
    const [userDetails, setUserDetails] = useState<NewUserDetailsDto>({
        userName: "",
        password: "",
        confirmPassword: "",
        avatar: Date.now().toString()
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    useLayoutEffect(() => {
        signedUser.userName && navigate("/profile")
    }, [])

    const nextPage = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault()
        setError("")
        setLoading(curr => !curr)

        try {
            const res = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userName: userDetails.userName,
                    password: userDetails.password,
                })
            })
            const data: SearchUserResponseDto = await res.json()

            if (!res.ok) {
                setLoading(curr => !curr)
                setError(data.message)
                return;
            }

            setSignedUser(oldUser => ({ ...oldUser, userName: data.userName, avatar: data.avatar }))
            navigate("/profile")
        }
        catch (error: any) {
            console.error(error)
            setLoading(curr => !curr)
            setError("something went wrong, please try again later")
        }
    }

    return (
        <div className="p-10 sm:p-20 h-full flex flex-col justify-evenly">
            <div className=" text-4xl font-semibold hidden sm:block">
                Lets get you ready to eat some burgers! <br />
                🍔 just enter your <span className="text-red-400">nickname</span> and <span className="text-red-400">nickname</span> 🍔
            </div>

            <div className=" text-2xl sm:4xl font-semibold block sm:hidden">
                🍔 Lets Begin! 🍔
            </div>


            {
                !loading ?
                    <form onSubmit={nextPage} className="flex flex-col w-[100%] items-center py-10 px-20">
                        {/* TODO repeating code. we need to generelize it */}
                        <input placeholder="your nickname" autoComplete='nickname' onChange={e => setUserDetails(oldDetails => ({ ...oldDetails, userName: e.target.value }))} type="text" required={true} value={userDetails.userName} className="min-w-max w-[20%] text-center p-2 m-2 rounded-md text-black" />
                        <input placeholder="your password" autoComplete='current-password' onChange={e => setUserDetails(oldDetails => ({ ...oldDetails, password: e.target.value }))} type="password" required={true} value={userDetails.password} className="min-w-max w-[20%] text-center p-2 m-2 rounded-md text-black" />
                        {/* TODO create and use an Error component */}
                        <div>
                            {
                                error ?
                                    <div className="text-red-400">{error}</div> :
                                    <div></div>
                            }
                        </div>
                        <input type="submit" value="next" className="min-w-max w-[15%] p-2 m-4 rounded-md bg-slate-500 text-xl hover:bg-slate-700 hover:w-[15.5%]" />
                    </form> :
                    <Loading />
            }
        </div>
    )
}

export default Login