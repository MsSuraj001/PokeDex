import React from 'react'
import './Pokemon.css'
import { Link } from 'react-router-dom';

function Pokemon({name, image, id}) {
  return (
      <Link to={`/pokemon/${id}`}>
        <div className='pokemon'>
            <div className='pokemon-name'>{name}</div>
            <div>
              <img className='pokemon-image' src={image} alt="" />
            </div>
        </div>
      </Link>
  )
}

export default Pokemon;
