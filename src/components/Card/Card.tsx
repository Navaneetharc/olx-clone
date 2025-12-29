import React from 'react'
import type { Product } from '../Context/ItemsContext';
import { Link } from 'react-router-dom';
import Favorite from '../../assets/favorite.svg'

interface cardPropsType{
  items: Product[];
}

const Card :React.FC<cardPropsType> =  ({items}) => {
  return (
    <div className='p-10 px-5 sm:px-15 md:px-30 lg:px-40 min-h-screen'>
      <h1 style={{ color: '#002f34' }} className="text-2xl">Fresh recommendations</h1>

      <div className='grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pt-5'>
        {items.map((item) => (
          <Link to={'/details'}
                state={{item}}
                key={item.id}
                style={{borderWidth:'1px', borderColor:'lightgray'}}
                className='relative w-full h-72 rounded-md border-solid bg-gray-50 overflow-hidden cursor-pointer'
                >
                  
              <button 
                  onClick={(e) => { e.preventDefault();}}
                  className='absolute z-10 top-3 right-3 bg-white p-2 rounded-full shadow-sm hover:shadow-md transition-all'
                >
                  <img className='w-5' src={Favorite} alt="Fav" />
              </button>

            <div className='w-full h-full flex flex-col'>              
              <div className='w-full h-40 flex justify-center p-2 bg-white'>
              <img
                className='h-36 object-contain'
                src={item.imageURL || 'https://via.placeholder.com/150'}
                alt={item.title} />
            </div>

            <div className='details p-1 pl-4 pr-4 flex-1 relative'>
              <h1 style={{ color: '#002f34' }} className="font-bold text-xl">₹ {item.price}</h1>
              <p className="text-sm text-gray-500 mt-1">{item.category}</p>
              <p className="mt-1 truncate text-gray-700">{item.title}</p>
            </div>
          </div>
          </Link>
          
        ))}

      </div>
    </div>
  )
}

export default Card
