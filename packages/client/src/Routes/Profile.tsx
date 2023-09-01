import React from 'react'

type Props = {}

function Profile({ }: Props) {
  const testServer = async () => {
    const res = await fetch('http://localhost:3000/', {
      method: 'GET',
      credentials: 'include',
    });

  }

  const setup = async () => {
    const res = await fetch('http://localhost:3000/new', {
      method: 'GET',
      credentials: 'include',
    });

  }
  return (
    <>
      <div>Profile</div>
      <button onClick={setup}>
        Cookie!
      </button>
      <button onClick={testServer}>
        Cookie??
      </button>
    </>
  )
}

export default Profile