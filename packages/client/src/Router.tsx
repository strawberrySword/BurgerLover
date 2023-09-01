import {
    createBrowserRouter,
    RouterProvider
} from 'react-router-dom'

import SignUp from './Routes/SignUp'
import Profile from './Routes/Profile'
import Protected from './Components/Protected';
import Login from './Routes/Login';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Profile />,
        errorElement: <>woopty</>,
    },
    {
        path: "/login",
        element: <Login />,
        errorElement: <>woopty</>,
    },
    {
        path: "/Profile",
        element: <Protected>
            <Profile />
        </Protected>,

        errorElement: <>poopsi</>
    }
]);

export default router