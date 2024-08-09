import { useEffect, useState } from "react";
import InfoApp from "../components/InfoApp";
import KeyFeture from "../components/KeyFeture";
import toast from "react-hot-toast";
import NewCard from "../components/NewCard";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ReduxStates } from "../Redux/Store";
import { add } from "../Redux/Slices/Fevs";
import { FaPlay, FaPause } from "react-icons/fa";

const logo = "https://firebasestorage.googleapis.com/v0/b/storyin-64d8b.appspot.com/o/assets%2F4214.jpg?alt=media&token=385f19da-9c44-48f3-9720-ec3428160f6a";

const Home = () => {

  const [data, setData] = useState([
    {
      poster: "",
      _id: "",
      user: {
        name: "",
      },
      title: "",
    },
  ]);

  const [trending, setTrending] = useState([
    {
      poster: "",
      _id: "",
      user: {
        name: "",
      },
      title: "",
    },
  ]);

  const [playAudio, setPlay] = useState(false);
  const [audio] = useState(new Audio("https://firebasestorage.googleapis.com/v0/b/storyin-64d8b.appspot.com/o/assets%2FLife%20of%20Pi%20-%20Book%20Summary-Fxbbs6oj.mp3?alt=media&token=6cdb2fe5-f20f-4d95-866d-ca2f51d4deaf"));
  const { status } = useSelector((state: ReduxStates) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    const controller = new AbortController();

    const data = async () => {
      const res = await fetch("https://storyin-8xqa2p7b.b4a.run/api/audio-book/get", {
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
      const res = await fetch("https://storyin-8xqa2p7b.b4a.run/api/audio-book/trending", {
        signal: controller.signal,
      });

      const resData = await res.json();

      if (resData.success === true) {
        setTrending(resData.data);
      } else {
        toast.error("problem");
      }
    };

    const getList = async () => {
      const data = await fetch("/api/fev/userList", {
        signal: controller.signal,
      });
      const bookData = await data.json();
      dispatch(add(bookData));
    };

    getList();
    data();
    trending();
    return () => controller.abort();
  }, []);

  const play = () => {
    audio.play();
    setPlay(true);
  };

  const pause = () => {
    audio.pause();
    setPlay(false);
  };

  return (
    <>
      <section className="bg-black text-white flex flex-col md:flex-row justify-evenly md:justify-between p-7 gap-8">
        <div className="max-w-[700px] lg:mt-72 portrait:flex flex-col items-center lg:ml-8">
          <h1 className="text-3xl portrait:text-center sm:text-4xl md:text-5xl xl:text-6xl mb-4 font-bold text-orange-600">
            Audiobooks for everyone
          </h1>
          {status === false ? (
            <p className="mb-8 text-white text-center sm:text-start text-sm mr-5 sm:text-xl">
              400,000+ bestselling stories and Storytel Originals. Prices
              starting from Rs 149/ month. Cancel anytime.
            </p>
          ) : (
            <p className="mb-8 text-white text-center sm:text-start text-sm mr-5 sm:text-xl">
              Discover best Audio books, Podcasts, Talk shows, Stories at
              StoryIn. An App Made with love in India. Listen content in Hindi &
              7 Other Languages!
            </p>
          )}
          {status === false ? (
            <Link
              to={"/subscription"}
              className="p-3 bg-white text-black mt-2 rounded-full px-9 text-sm lg:text-xl font-semibold sm:font-bold hover:opacity-80"
            >
              Subscribe Now
            </Link>
          ) : (
            <Link
              to={"/audio-books"}
              className="p-3 bg-white text-black rounded-full px-9 mt-2 text-sm lg:text-xl font-semibold hover:opacity-80"
            >
              Explore Premium
            </Link>
          )}
        </div>

        <div className="w-[270px] m-auto h-auto sm:w-[440px]">
          <img
            className="object-contain md:ml-[15%] xl:ml-[25%] object-center rounded-md"
            alt="hero"
            draggable={false}
            src={logo}
          />
          <div className="flex gap-4 md:ml-[13%] xl:ml-[25%] justify-start items-center mt-4">
            <div className=" w-12 h-12 bg-white rounded-full flex justify-center items-center">
              {playAudio ? (
                <FaPause
                  onClick={pause}
                  className="w-4 h-4 text-black text-center"
                />
              ) : (
                <FaPlay
                  onClick={play}
                  className="w-4 h-4 text-black text-center"
                />
              )}
            </div>
            <div className="w-[100px]">
              <h1 className="font-semibold text-base">Life Of Pie</h1>
              <p className="line-clamp-2 text-xs w-[190px]">
                Life of Pi is a Canadian philosophical novel by Yann Martel
                published in 2001.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="m-auto">
        <KeyFeture />
        <InfoApp />
        {data.length > 0 ? (
          <>
            <section className=" max-w-[1200px] flex flex-col gap-4 m-auto mb-2">
              <div className="ml-6 mt-2">
                <h1 className="font-semibold text-xl">New On StoryIn</h1>
              </div>
              <div id="scroll" className="overflow-auto whitespace-nowrap mb-3">
                {data.map((item, i) => {

                  return (
                    <NewCard
                      key={i}
                      img={`${item?.poster}`}
                      id={item?._id}
                      author={item?.user.name}
                      bookName={item?.title}
                    />
                  );
                })}
              </div>
            </section>
          </>
        ) : (
          <section className=" max-w-[1200px] flex flex-col gap-4 m-auto mb-2">
            <div className="ml-6 mt-2">
              <h1 className="font-semibold text-xl">New On StoryIn</h1>
            </div>
            <div
              id="scroll"
              className="overflow-auto m-auto whitespace-nowrap my-7"
            >
              <h2>Loading . . . </h2>
            </div>
          </section>
        )}

        {/* Trending on */}
        {trending.length > 0 ? (
          <>
            <section className=" max-w-[1200px] flex flex-col gap-4 m-auto mb-2">
              <div className="ml-6 mt-2">
                <h1 className="font-semibold text-xl">Most Awaited</h1>
              </div>
              <div id="scroll" className="overflow-auto whitespace-nowrap mb-3">
                {trending.map((item, i) => (
                  <NewCard
                    key={i}
                    img={`${item?.poster}`}
                    id={item?._id}
                    author={item?.user.name}
                    bookName={item?.title}
                  />
                ))}
              </div>
            </section>
          </>
        ) : (
          <section className=" max-w-[1200px] flex flex-col gap-4 m-auto mb-2">
            <div className="ml-6 mt-2">
              <h1 className="font-semibold text-xl">Most Awaited</h1>
            </div>
            <div
              id="scroll"
              className="overflow-auto m-auto whitespace-nowrap my-7"
            >
              <h2>Loading . . . </h2>
            </div>
          </section>
        )}
      </div>
    </>
  );
};

export default Home;
