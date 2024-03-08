import React from 'react'
import sec from "../assets/Personalization_Block.jpeg";
import thi from "../assets/3-device.png";

const KeyFeture = () => {
  return (
    <>
     <section className="bg-white flex items-center gap-20 max-w-[950px] justify-center mt-24 mb-24 m-auto">
          <div className="lg:max-w-3xl lg:w-full md:1/2 w-5/6">
            <img
              className="object-contain object-center rounded"
              src={sec}
              alt="secImg"
            />
          </div>
          <div className="max-w-[550px] flex flex-col gap-2">
            <h2 className="text-orange-500 text-[4rem] font-bold max-w-7">
              StoryIn Original
            </h2>
            <p className="text-slate-600 text-xl">
              Discover unique stories only available on Storytel. Choose among
              celebrated series, captivating fiction, or pulse-raising crime.
            </p>
            <button className="p-3 bg-black text-white rounded-full text-xl font-semibold hover:opacity-80 max-w-[15rem] mt-6">
              Subscribe Now
            </button>
          </div>
        </section>

        <section className="flex flex-row m-auto mb-12 max-w-[950px] justify-center items-center gap-20 ">
          <div className="flex flex-col">
            <h1 className="text-orange-500 font-bold text-[4rem]">
              Anytime, anywhere
            </h1>
            <p className="text-slate-600 text-xl">
              Read in bed – listen on the go. Download audiobooks and e-books
              offline on your favorite devices.
            </p>
            <button className="p-3 bg-black text-white rounded-full text-xl font-semibold hover:opacity-80 max-w-[15rem] mt-6">
              Explore More
            </button>
          </div>

          <div className="lg:max-w-3xl lg:w-full md:1/2 w-5/6">
            <img
              className="object-contain object-center rounded"
              src={thi}
              alt="secImg"
            />
          </div>
        </section>
    </>
  )
}

export default KeyFeture