import { useEffect, useState } from "react";
import logo from "../assets/4214.jpg";

import InfoApp from "../components/InfoApp";
import KeyFeture from "../components/KeyFeture";
import toast from "react-hot-toast";
import NewCard from "../components/NewCard";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ReduxStates } from "../Redux/Store";
import { add } from "../Redux/Slices/Fevs";

const Home = () => {
  const [data, setData] = useState([{
    poster: "",
    _id: "",
    user: {
      name: ""
    },
    title: ""
  }]);
  const [trending, setTrending] = useState([
    {
      poster: "",
      _id: "",
      user: {
        name: ""
      },
      title: ""
    }
  ]);
  const { status } = useSelector((state: ReduxStates) => state.user);

  const dispatch = useDispatch();

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

  return (
    <>
      <section className="bg-black text-white flex flex-col md:flex-row justify-evenly p-7 gap-8">
        <div className="max-w-[700px] lg:mt-72 lg:ml-8">
          <h1 className="text-2xl sm:text-4xl mb-4 font-bold text-orange-600">
            Audiobooks for everyone
          </h1>
          <p className="mb-8 text-white text-sm sm:text-xl">
            400,000+ bestselling stories and Storytel Originals. Prices starting
            from Rs 149/ month. Cancel anytime
          </p>
          {status === false ? (
            <Link
              to={"/subscription"}
              className="p-3 bg-white text-black mt-2 rounded-lg text-sm lg:text-xl font-semibold sm:font-bold hover:opacity-80"
            >
              Subscribe Now
            </Link>
          ) : (
            <Link
              to={"/audio-books"}
              className="p-3 bg-white text-black rounded-lg mt-2 text-sm lg:text-xl font-semibold hover:opacity-80"
            >
              Explore Premium
            </Link>
          )}
        </div>

        <div className="w-[220px] m-auto h-auto sm:w-[440px]">
          <img
            className="object-cover object-center rounded-md"
            alt="hero"
            draggable={false}
            src={logo}
          />
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
