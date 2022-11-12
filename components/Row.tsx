import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'
import React, {useRef, useState} from 'react'
import { Movie } from '../typeProps'
import ThumbNail from './ThumbNail'

interface Props {
    title:string,
    movies:Movie[]
}

function Row({title , movies} : Props) {

    const rowRef = useRef<HTMLDivElement>(null)
    const [isMoved , setIsMoved] = useState(false)

    const handleClick = (direction:string)=>{
        setIsMoved(true)

        if(rowRef.current){
            const {scrollLeft,clientWidth} = rowRef.current
     
            
        const scrollTo = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth

            rowRef.current.scrollTo({
                left:scrollTo,
                behavior:'smooth'
            })

        }


    }

    

  return (
    <div className='h-[10rem] space-y-0.5 md:space-y-2 overflow-hidden md:mb-4'>
      <h2 className='w-56 cursor-pointer text-sm font-semibold text-[#e5e5e5] transition duration-200 hover:text-white'>{title}</h2>
      <div className='group relative md:-ml-2 overflow-hidden'>
        <ChevronLeftIcon className={`absolute top-0 bottom-0 left-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100 ${!isMoved && 'hidden'}`} onClick={() => handleClick("left")}/>

            <div ref={rowRef} className='flex space-y-1 items-center space-x-0.5 overflow-x-scroll md:space-x-2 md:p-2 scrollbar-hide'>
                {
                    movies.map((movie) => (
                        <ThumbNail key={movie.id} movie={movie}/>
                    ))
                }
            </div>

        <ChevronRightIcon className={`absolute top-0 bottom-0 right-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100`} onClick={() => handleClick("right")}/>
      </div>
    </div>
  )
}

export default Row
