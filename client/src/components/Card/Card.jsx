import React from 'react';

export default function Card({name, image, types}){
    return (
        <div className="card">
            <h1 className="name">{name}</h1>
            <img src={image} alt="image not found"/>
            <div>
               {types.map((el, index) => {
                   return(
                       <div className='types' key={index}>
                       <img src={el.image} alt="image not found" />
                       </div>
                   )
               })}
            </div>
        </div>
    )
}