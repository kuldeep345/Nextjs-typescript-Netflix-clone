import Image from 'next/image'
import React from 'react'
import { useRecoilState } from 'recoil'
import { baseUrl } from '../constants/baseUrl'
import { modalState, movieState } from '../states/ModalState'
import { Movie } from '../typeProps'

interface Props {
    movie: Movie
}

const ThumbNail = ({movie}:Props) => {

  const [showModal , setShowModal] = useRecoilState(modalState)
    const [currentMovie, setCurrentMovie] = useRecoilState(movieState)


  return (
    <div className='relative h-28 min-w-[180px] cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105'
    onClick={()=>{
      setCurrentMovie(movie)
      setShowModal(true)
    }}
    >
        <Image src={`${baseUrl}${movie.backdrop_path || movie.poster_path}`} 
        alt={`${movie.id}`}
        className="rounded-sm object-cover md:rounded"
        layout='fill'
        />
    </div>
  )
}

export default ThumbNail
