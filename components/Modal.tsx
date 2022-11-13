import React, { useState, useEffect } from 'react'
import MuiModal from '@mui/material/Modal'
import { useRecoilState, useRecoilValue } from 'recoil'
import { modalState, movieState } from "../states/ModalState"
import { PlusIcon, ThumbUpIcon, VolumeOffIcon, VolumeUpIcon, XIcon } from '@heroicons/react/solid'
import { Element, Genre } from '../typeProps'
import ReactPlayer from 'react-player'
import { FaPlay } from 'react-icons/fa'

function Modal() {

  const [showModal, setShowModal] = useRecoilState(modalState)
  const showMovie = useRecoilValue(movieState)
  const [trailer, setTrailer] = useState("")
  const [genres, setGenres] = useState<Genre[]>([])
  const [muted, setMuted] = useState(true)

  useEffect(() => {
    if (!showMovie) return

    async function fetchMovie() {
      const data = await fetch(`https://api.themoviedb.org/3/movie/${showMovie?.id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&append_to_response=videos`).then((response) => response.json()).catch((err) => {
        console.log(err)
      })

      if (data?.videos) {
        const index = data.videos.results.findIndex((element: Element) => element.type === "Trailer")
        console.log(index)
        setTrailer(data.videos?.results[index]?.key)
      }

      if (data?.genres) {
        setGenres(data.genres)
      }

    }

    fetchMovie()
  }, [showMovie])

  console.log(trailer)


  const handleClose = () => {
    setShowModal(false)
  }

  return (
    <MuiModal open={showModal} onClose={handleClose} className="fixed !top-7 left-0 right-0 z-50 mx-auto w-full max-w-4xl 2xl:max-w-5xl overflow-hidden overflow-y-scroll rounded-md scrollbar-hide">
      <>
        <button
          onClick={handleClose}
          className="modalButton absolute right-5 top-5 !z-40 h-9 w-9 border-none bg-[#181818] hover:bg-[#181818]"
        >
          <XIcon className="h-6 w-6" />
        </button>

        <div className='relative pt-[50.25%]'>
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${trailer}`}
            width="100%"
            height="100%"
            style={{ position: 'absolute', top: '0', left: '0' }}
            playing
            muted={muted}
          />

          <div className='absolute bottom-0 flex w-full items-center justify-between px-10'>
            <div className='flex space-x-2'>
              <button className="flex items-center gap-x-2 rounded bg-white px-8 text-xl font-bold text-black transition hover:bg-[#e6e6e6]">
                <FaPlay className="h-7 w-7 text-black" />
                Play
              </button>

              <button className="modalButton">
                <PlusIcon className='h-7 w-7' />
              </button>

              <button className="modalButton">
                <ThumbUpIcon className='h-7 w-7' />
              </button>

            </div>


            <button className="modalButton" onClick={() => setMuted(!muted)}>
              {muted ?
                (
                  <VolumeOffIcon className='h-6 w-6' />
                ) : (
                  <VolumeUpIcon className='h-7 w-7' />
                )}
            </button>

          </div>
        </div>

        <div className="flex space-x-16 rounded-b-md bg-[#181818] px-10 py-8">
          <div className='space-y-6 text-lg'>
            <div className='flex items-center space-x-2 text-xs'>
              <p className='font-semibold text-green-400'>{showMovie!.vote_average * 10}</p>
              <p className="font-light">{showMovie?.release_date}</p>
              <div className="flex h-4 items-center justify-center rounded border border-white/40 px-1.5 text-xs">
                HD
              </div>
            </div>

            <div className='flex flex-col gap-x-10 gap-y-4 font-light md:flex-row'>
              <p className='w-5/6'>{showMovie?.overview}</p>
              <div className="flex flex-col space-y-3 text-sm">
                <div>
                <span className="text-[gray]">Genres:</span>
                {genres.map((genre) => genre.name).join(', ')}
                </div>

                  <div>
                    <span className='text-[gray]'>Original language: </span>
                    {showMovie?.original_language}
                  </div>
                  <div>
                    <span className='text-[gray]'>Total votes: </span>
                    {showMovie?.vote_count}
                  </div>

              </div>
            </div>
          </div>
        </div>

      </>
    </MuiModal>
  )
}

export default Modal
