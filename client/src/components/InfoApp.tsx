import React from 'react'
import { useSelector } from 'react-redux'
import { ReduxStates } from '../Redux/Store'
import { Link } from 'react-router-dom'

const InfoApp = () => {

  const { status } = useSelector((state: ReduxStates)=> state.user)

  return (
    <section className="bg-black max-w-[1800px] p-14 flex flex-col m-auto items-center gap-2 mb-3">
        <div className="flex flex-row gap-2 justify-evenly">
          <div className="bg-blue-100 px-20 py-14 w-full rounded flex flex-col gap-1">
            <h1 className="font-semibold text-xl">A never-ending library</h1>
            <p className="text-sm text-gray-600">
              400 000+ books – 10+ languages. Find your perfect story and have a
              laugh, rewind, or gain a new ...
            </p>
          </div>
          <div className="bg-pink-100 px-20 py-14 w-full rounded flex flex-col gap-1">
            <h1 className="font-semibold text-xl">Kids Mode for Children</h1>
            <p className="text-sm text-slate-600">
              Fuel your child's imagination with 30,000+ captivating audiobooks
              for children. Discover classics, fantasy,...
            </p>
          </div>
          <div className="bg-yellow-100 px-20 py-14 w-full rounded flex flex-col gap-1 ">
            <h1 className="font-semibold text-xl">Storytel Originals</h1>
            <p className="text-sm text-gray-600">
              Experience the magic of Originals! Exclusive, captivating stories
              tailored just for you- An immersive...
            </p>
          </div>
        </div>

        { status === false ? <Link to={'/subscription'} className="p-3 bg-white text-black rounded-lg mt-6 text-lg lg:text-xl font-bold hover:opacity-80">
            Subscribe Now
          </Link> : <Link to={'/audio-books'} className="p-3 bg-white text-black rounded-lg text-lg lg:text-xl mb-7 font-semibold hover:opacity-80">
            Explore Premium
          </Link> }
      </section>
  )
}

export default InfoApp