import { useState } from 'react'
import { RouterProvider } from 'react-router-dom'

import router from './Router'

import { SignedUser } from './Context/user.context'

function App() {
  const [showMenu, setShowMenu] = useState(false)
  const [currentUser, setCurrentUser] = useState({
    userName: "",
    avatar: "",
    token: "",
  })

  const toggleMenu = () => { setShowMenu(!showMenu) }
  // TODO use router such as in the admin toturial
  return (
    <div className='w-[100%] h-[100%] flex flex-direction-row justify-evenly'>
      <SignedUser.Provider value={[currentUser, setCurrentUser]}>

        <div className='min-w-[80%] w-[100%] text-center'>
          <RouterProvider router={router} />
        </div>
        {/* {
          showMenu ?
            (<div onClick={toggleMenu} className='w-[20%] bg-gray-400 text-center'>Menu</div>) :
            (<div onClick={toggleMenu} className='w-[5%] bg-gray-400 text-center'>=</div>)
        } */}
      </SignedUser.Provider>

    </div>
  )
}

export default App
