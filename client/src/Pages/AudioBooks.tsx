import React, { useEffect, useState } from "react";
import { FaCaretRight } from "react-icons/fa6";
import mainImg from "../assets/Cover.jpg";
import { Link, useParams } from "react-router-dom";
import Robo from "../assets/img.webp";
import Karn from "../assets/NewCard.jpeg";
import Card from "../components/Card";
import NewCard from "../components/NewCard";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { ReduxStates } from "../Redux/Store";

const AudioBooks = () => {
  const [data, setData] = useState([]);
  const [Trending, setTrending] = useState([]);
  const { status } = useSelector((state: ReduxStates) => state.user);

  useEffect(() => {
    const controller = new AbortController();

    const data = async () => {
      const res = await fetch("/api/audio-book/get", {
        signal: controller.signal,
      });
      const resData = await res.json();

      if (resData.success === true) {
        setData(resData.data);
      } else {
        toast.error("problem");
      }
      
    };

    const trending = async () => {
      const res = await fetch("/api/audio-book/trending", {
        signal: controller.signal,
      });
      const resData = await res.json();

      if (resData.success === true) {
        setTrending(resData.data);
      } else {
        toast.error("problem");
      }
    };
    
    trending();
    data();
    return () => controller.abort();
  }, []);

  return (
    <section className="h-full w-full">
      <div className="sm:h-[40%] w-full relative flex items-center gap-2 flex-col">
        <div className="h-[100%] absolute overflow-hidden w-full">
          <img src={mainImg} className="object-cover" alt="img" />
        </div>

        <div
          style={{
            boxShadow: "5px -70px 60px black inset",
          }}
          className="relative mt-7 sm:mt-[340px] flex flex-col gap-3 w-full"
        >
          <h1 className="ml-14 portrait:ml-8 text-2xl sm:text-5xl text-orange-500 font-bold">
            Audiobooks
          </h1>
          <p className="ml-14 portrait:ml-8 text-xs portrait:line-clamp-3 sm:text-base text-white max-w-[590px]">
            Get unlimited access to the world of audiobooks - where new content
            awaits you every day. Step into a limitless audio adventure with
            over 400,000+ titles, waiting to be discovered.
          </p>
          {status === false ? (
            <Link
              to={"/subscription"}
              className="p-3 bg-white mx-14 flex justify-center text-black max-w-52 mb-5 rounded-lg text-base font-bold hover:opacity-80"
            >
              Subscribe Now
            </Link>
          ) : (
            <p className="sm:mb-9"></p>
          )}
        </div>
      </div>

      <div className="max-w-[1300px] ml-8 m-auto mt-3">
        <Link
          className="underline text-sm font-semibold flex items-center text-orange-500"
          to={"/"}
        >
          Home
          <FaCaretRight className="text-gray-600" />
        </Link>

        <section className="mr-8 my-3">
          {data.length > 0 ? (
            <>
              <section className=" max-w-[1200px] flex flex-col gap-4 m-auto mb-9">
                <div className="ml-6 mt-2">
                  <h1 className="font-semibold text-xl">New On StoryIn</h1>
                </div>
                <div
                  id="scroll"
                  className="overflow-auto whitespace-nowrap mb-3"
                >
                  {data.map((item, i) => (
                    <NewCard
                      key={i}
                      img={`/api/${item?.poster}`}
                      id={item?._id}
                      author={item?.user.name}
                      bookName={item?.title}
                    />
                  ))}
                </div>
              </section>
            </>
          ) : (
            <section className=" max-w-[1200px] flex flex-col gap-4 m-auto mb-9">
              <div className="ml-6 mt-2">
                <h1 className="font-semibold text-xl">New On StoryIn</h1>
              </div>
              <div
                id="scroll"
                className="overflow-auto m-auto whitespace-nowrap my-9"
              >
                <h2>Loading . . . </h2>
              </div>
            </section>
          )}

          {/* <section className="overflow-hidden flex mt-3 flex-col gap-4"> */}
          <section className="mr-8 my-3">
            {Trending.length > 0 ? (
              <>
                <section className=" max-w-[1200px] flex flex-col gap-4 m-auto mb-9">
                  <div className="ml-6 mt-2">
                    <h1 className="font-semibold text-xl">
                      Stories to start with
                    </h1>
                  </div>
                  <div
                    id="scroll"
                    className="overflow-auto whitespace-nowrap mb-3"
                  >
                    {Trending.map((item, i) => (
                      <NewCard
                        key={i}
                        img={`/api/${item?.poster}`}
                        id={item?._id}
                        author={item?.user.name}
                        bookName={item?.title}
                      />
                    ))}
                  </div>
                </section>
              </>
            ) : (
              <section className=" max-w-[1200px] flex flex-col gap-4 m-auto mb-9">
                <div className="ml-6 mt-2">
                  <h1 className="font-semibold text-xl">Stories to start with</h1>
                </div>
                <div
                  id="scroll"
                  className="overflow-auto m-auto whitespace-nowrap my-9"
                >
                  <h2>Loading . . . </h2>
                </div>
              </section>
            )}
          </section>

          {/* <section className="overflow-hidden flex flex-col gap-4 m-auto">
            <Card
              img={Karn}
              id="23133"
              author="Shivaji Sawant"
              bookName="Mrutyunjay Bhag 1 - Karn"
              title="Stories to start with"
            />
          </section> */}
        </section>
      </div>
    </section>
  );
};

export default AudioBooks;
{
  /* <div className="h-[45%] absolute">
        <div
          className="h-[100%] w-full absolute overflow-hidden"
          style={{ boxShadow: "inset 0 0 10px #f8a100" }}
        >
          <img
            src={mainImg}
            className=" object-cover shadow-inner"
            alt="mainLogo"
          />
        </div>
  <Card
              img={Robo}
              id="12445"
              author="Robot Kiyosaki"
              bookName="Rich Dad Poor Dad"
              title="Stories to start with"
            />
        <div
          style={{
            boxShadow: "10px -110px 70px black inset",
          }}
          className="absolute bottom-0 flex flex-col gap-3 w-full justify-center left-0"
        >
          <h1 className="text-7xl text-orange-500 font-bold mx-14">
            Audiobooks
          </h1>
          <p className="text-lg text-white mx-14 mr-[560px]">
            Get unlimited access to the world of audiobooks - where new content
            awaits you every day. Step into a limitless audio adventure with
            over 400,000+ titles, waiting to be discovered.
          </p>
          <button className="p-3 bg-white mx-14 text-black max-w-52 mb-5 rounded-lg text-base font-bold hover:opacity-80">
            Subscribe Now
          </button>
        </div>
      </div> */
}
