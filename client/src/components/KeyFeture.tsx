import React from "react";
import sec from "../assets/Personalization_Block.jpeg";
import thi from "../assets/3-device.png";
import { useSelector } from "react-redux";
import { ReduxStates } from "../Redux/Store";
import { Link } from "react-router-dom";

const KeyFeture = () => {
  const { status } = useSelector((state: ReduxStates) => state.user);

  return (
    <>
      <section className="bg-white flex items-center flex-col mx-4 gap-4 sm:gap-20 max-w-[950px] justify-center mt-24 mb-24 m-auto">
        <h2 className="text-orange-500 sm:hidden text-[3rem] font-bold">
          StoryIn Original
        </h2>
        <div className="h-auto">
          <img
            className="object-contain object-center rounded"
            src={sec}
            alt="secImg"
          />
        </div>
        <div className="sm:max-w-[550px] text-center items-center gap-3 flex flex-col gap-2">
          <h2 className="text-orange-500 hidden sm:block text-[4rem] font-bold max-w-7">
            StoryIn Original
          </h2>
          <p className="text-slate-600 text-xl">
            Discover unique stories only available on Storytel. Choose among
            celebrated series, captivating fiction, or pulse-raising crime.
          </p>
          {status === false ? (
            <Link
              to={"/subscription"}
              className="p-3 flex justify-center bg-black text-white rounded-lg text-center m-auto text-lg lg:text-xl font-bold hover:opacity-80"
            >
              Subscribe Now
            </Link>
          ) : (
            <Link
              to={"/audio-books"}
              className="p-3 bg-black flex justify-center text-white rounded-lg text-lg lg:text-xl max-w-[15rem]  font-semibold hover:opacity-80"
            >
              Explore Premium
            </Link>
          )}
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
          <Link
            to={"/audio-books"}
            className="p-3 bg-black text-white flex justify-center rounded-lg text-xl font-semibold hover:opacity-80 max-w-[15rem] mt-6"
          >
            Explore More
          </Link>
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
  );
};

export default KeyFeture;
