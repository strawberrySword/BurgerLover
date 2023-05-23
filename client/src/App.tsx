import { useState } from 'react'

function App() {
  const [showMenu, setShowMenu] = useState(false)

  const toggleMenu = () => { setShowMenu(!showMenu) }

  return (
    <div className='w-[100%] h-[100%] flex flex-direction-row justify-evenly'>
      <div className='min-w-[80%] w-[100%] text-center'>Hello World</div>
      {
        showMenu ?
          (<div onClick={toggleMenu} className='w-[20%] bg-gray-400 text-center'>Menu</div>) :
          (<div onClick={toggleMenu} className='w-[5%] bg-gray-400 text-center'>=</div>)
      }

    </div>
  )
}

export default App
