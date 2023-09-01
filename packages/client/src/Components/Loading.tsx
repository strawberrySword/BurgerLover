import React from 'react'

type Props = {}

const Loading = (props: Props) => {
    return (
        <div className='my-28 mx-auto max-w-[200px] h-fit p-2 rounded-md bg-slate-500 text-xl hover:bg-slate-700 hover:w-[15.5%] flex justify-center items-center'>
            <svg className='w-[20%] animate-spin' version="1.1" id="L3" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                viewBox="0 0 100 100" enableBackground="new 0 0 0 0" >
                <circle fill="none" stroke="#fff" strokeWidth="6" cx="50" cy="50" r="44" />
                <circle fill="#fff" stroke="#e74c3c" strokeWidth="3" cx="8" cy="54" r="6" />
            </svg>
            <div className='px-5'>
                Loading
            </div>
        </div>
    )
}

export default Loading