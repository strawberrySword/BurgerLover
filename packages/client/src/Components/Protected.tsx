import React, { useContext } from 'react'
import { SignedUser } from '../Context/user.context';
import { Navigate } from 'react-router-dom';

type props = {
    children: React.ReactNode
}

const Protected = ({ children }: props) => {
    const [signedUser, setSignedUser] = useContext(SignedUser);

    if (!signedUser.userName) {
        return <Navigate to="/" replace />
    }
    return <>{children}</> 
}

export default Protected