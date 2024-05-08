import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import NewCard from "../components/NewCard";
import { useSelector } from "react-redux";
import { ReduxStates } from "../Redux/Store";
import { FaHeart } from "react-icons/fa";
import noImg from "../assets/noImg.jpg";

const BookPage = () => {
  const [data, setData] = useState({
    _id: "",
    title: "",
    description: "",
    user: {
      _id: "",
      name: "",
    },
    poster: "",
    tags: "",
    episodes: [""],
    createdAt: "",
    updatedAt: "",
  });

  const [newReq, setNewReq] = useState([
    {
      poster: "",
      _id: "",
      title: "",
      user: {
        name: "",
      },
    },
  ]);
  const [heart, setHeart] = useState(false);
  const [heartLoading, setHeartLoading] = useState(false);
  const { id } = useParams();

  const { user, status } = useSelector((state: ReduxStates) => state.user);

  useEffect(() => {
    const controller = new AbortController();

    const getData = async () => {
      const res = await fetch(`https://storyin-1.onrender.com/api/audio-book/get/${id}`, {
        signal: controller.signal,
      });
      const resData = await res.json();

      setData(resData);
    };

    const data = async () => {
      const res = await fetch("https://storyin-1.onrender.com/api/audio-book/get", {
        signal: controller.signal,
      });
      const resData = await res.json();

      if (resData.success === true) {
        setNewReq(resData.data);
      } else {
        toast.error("problem");
      }
    };

    getData();
    data();

    return () => controller.abort();
  }, []);

  const handleHeart = async () => {
    setHeartLoading(true);

    const like = await fetch(`https://storyin-1.onrender.com/api/fev/create/${id}`, {
      method: "POST",
    });
    const { message } = await like.json();

    toast.success(message);
    setHeart(!heart);
    setHeartLoading(false);
  };

  return (
    <section className="text-gray-600 mt-14 mb-3 body-font">
      {data?.title ? (
        <>
          <button
            disabled={heartLoading}
            onClick={() => handleHeart()}
            className={`${
              heart
                ? "z-0 left-[83%] sm:left-[88%] text-2xl mr-5 bg-grey-100 rounded-lg top-24 text-red-500"
                : ""
            } absolute z-0 left-[83%] sm:left-[88%] text-2xl mr-5 bg-grey-100 rounded-lg top-24`}
          >
            <FaHeart />
          </button>
          <div className="container flex flex-col sm:flex-row sm:mx-4 md:mx-8 gap-4 items-center justify-center">
            <>
              <img
                className="mb-10 h-80 w-60 object-contain object-center rounded"
                alt="hero"
                src={`https://storyin-1.onrender.com/api/${data.poster}`}
                onError={(e) => {
                  e.currentTarget.src = noImg;
                }}
              />

              <div className="text-center lg:w-1/2 w-[90%] sm:w-full">
                <div className="flex justify-evenly w-full">
                  <div className="">
                    <h1 className="title-font sm:text-4xl text-3xl mb-1 font-bold text-gray-900">
                      {data?.title}
                    </h1>
                    <p className="font-semibold mb-4">
                      By{" "}
                      <span className="text-orange-500 cursor-pointer font-bold">
                        {data?.user.name}
                      </span>{" "}
                      With:{" "}
                      <span className="text-orange-500 cursor-pointer font-bold">
                        Sanket Mhatre
                      </span>{" "}
                      Publisher{" "}
                      <span className="text-orange-500 cursor-pointer font-bold">
                        Storyside IN
                      </span>
                    </p>
                  </div>
                </div>

                <div className="max-w-[550px] m-auto p-4 flex flex-row gap-8 justify-evenly border border-gray-500 border-t-[1px] border-b-[1px] border-x-0">
                  <span className="font-semibold text-sm">
                    Ratings :{" "}
                    <span className="font-bold  text-xs text-black">19603</span>
                  </span>
                  <p className="border-black border-r-2"></p>
                  <span className="font-semibold text-sm">
                    Duration :{" "}
                    <span className="font-bold text-xs  text-black">
                      4H 55min
                    </span>
                  </span>
                  <p className="border-black border-r-2"></p>
                  <span className="font-semibold text-sm">
                    Language :{" "}
                    <span className="font-bold text-xs  text-black">
                      Marathi
                    </span>
                  </span>
                </div>

                <p className="mb-8 max-w-[550px] line-clamp-6 m-auto mt-4">
                  {data?.description}
                </p>
              </div>
            </>
          </div>

          <div className="flex flex-col items-center m-auto w-[90%] sm:max-w-[900px] justify-center">
            <h1>Episodes</h1>
            <p className="border-t-[1px] my-3 border-slate-500 h-1 w-full" />
            <div className="flex flex-row items-center mb-3 gap-2">
              {status === true || user?.role === "admin" ? (
                <>
                  <h1 className="h-8 w-8 border-[1px] border-black text-black flex items-center text-sm justify-evenly rounded-full m-auto">
                    <span>1</span>
                  </h1>

                  <audio
                    className="sm:w-[500px] text-red-400"
                    draggable={false}
                    controls={true}
                  >
                    <source
                      src={`https://storyin-1.onrender.com/api/stream?path=${data.episodes[0]}`}
                      className=""
                      type="audio/mp3"
                    />
                  </audio>
                </>
              ) : (
                <div className="flex flex-col gap-2 items-center justify-center">
                  <h1 className="text-black text-lg">Buy Subscripion from here . . .</h1>
                  <Link
                    to={"/subscription"}
                    className="p-2 bg-orange-400 text-white mt-2 rounded-full px-9 text-sm lg:text-xl font-semibold sm:font-bold duration-300 hover:scale-105"
                  >
                    Subscribe Now
                  </Link>
                </div>
              )}
            </div>

            <p className="border-t-[1px] my-3 border-slate-500 h-1 w-full" />
          </div>

          <section className="mt-6 flex flex-col gap-6">
            {newReq.length > 0 ? (
              <>
                <section className="w-screen sm:max-w-[1200px] flex flex-col gap-4 m-auto mb-9">
                  <div className="ml-6 mt-2">
                    <h1 className="font-semibold text-xl">Recommended . . .</h1>
                  </div>
                  <div
                    id="scroll"
                    className="overflow-auto whitespace-nowrap mb-3"
                  >
                    {newReq?.map((item, i) => (
                      <NewCard
                        key={i}
                        img={`https://storyin-1.onrender.com/api/${item?.poster}`}
                        id={item?._id}
                        author={item?.user.name}
                        bookName={item?.title}
                      />
                    ))}
                  </div>
                </section>
              </>
            ) : (
              <h1>Loading . . .</h1>
            )}
          </section>
        </>
      ) : (
        <h1 className="flex justify-center items-center my-20">
          Loading . . .
        </h1>
      )}
    </section>
  );
};

export default BookPage;
