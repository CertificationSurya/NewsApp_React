import React from 'react'
import loading from './loading.gif'

const Spinner = () =>{
    return (
      <div className='text-center'>
        <img src={loading} alt="loading"  style={{background: "transparent", width: '20rem', height:"10rem", objectFit: "cover"}}/>
      </div>
    )
}

export default Spinner;