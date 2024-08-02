import React from 'react'

function Pokemon({name, image}) {
  return (
    <div>
      <div>{name}</div>
      <div>
        <img src={image} alt="" />
        <h1>Pokemon</h1>
      </div>
    </div>
  )
}

export default Pokemon;
