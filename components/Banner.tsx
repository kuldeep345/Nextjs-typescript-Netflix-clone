import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Movie } from '../typeProps'
import {baseUrl} from '../constants/baseUrl'
import {FaPlay} from 'react-icons/fa'
import {InformationCircleIcon} from '@heroicons/react/solid'

interface Props {
    netflixOriginals:Movie[]
}

const Banner = ({netflixOriginals}:Props) => {

    

    const [movie , setMovie] = useState<Movie | null>(null)

    useEffect(() => {
        setMovie(
            netflixOriginals[1]
        )
    }, [netflixOriginals])
    

  return (
    <div className='flex flex-col space-y-2 pt-32 pb-28  h-[60vh]  md:space-y-4 lg:h-[75vh] xl:h-[76vh] 2xl:h-[56vh] lg:justify-end lg:pb-12'>
        <div className='absolute top-0 left-0 h-[95vh] -z-10 w-screen'>
            <Image src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`} 
            layout="fill"
            className='object-cover object-top'
            alt=''
            />
        </div>

        <h1 className='text-2xl md:text-4xl lg:text-5xl'>{movie?.title || movie?.original_title}</h1>
        <p className='max-w-xs text-xs md:max-w-lg md:text-lg lg:max-w-2xl lg:text-xl text-shadow-lg'>{movie?.overview}</p>

        <div className='flex space-x-3'>
            <button className='bannerBtn bg-white text-black'><FaPlay 
            className='h-4 w-4 text-black md:h-7 md:w-7' />Play</button>
            <button className='bannerBtn bg-[gray]/70'>More Info <InformationCircleIcon className='h-4 w-4 text-white md:h-7 md:w-7' /></button>
        </div>

    </div>
  )
}

export default Banner
