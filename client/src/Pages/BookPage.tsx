import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import NewCard from "../components/NewCard";
import { useSelector } from "react-redux";
import { ReduxStates } from "../Redux/Store";
import { FaHeart } from "react-icons/fa";

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
    __v: "",
  });

  const [newReq, setNewReq] = useState([]);
  const [heart, setHeart] = useState(false);
  const [heartLoading, setHeartLoading] = useState(false);
  const { id } = useParams();

  const { user, status } = useSelector((state: ReduxStates) => state.user);

  useEffect(() => {
    const controller = new AbortController();

    const getData = async () => {
      const res = await fetch(`/api/audio-book/get/${id}`, {
        signal: controller.signal,
      });
      const resData = await res.json();

      setData(resData);
    };

    const data = async () => {
      const res = await fetch("/api/audio-book/get", {
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

  const handleHeart = async() => {
    setHeartLoading(true);

    const like = await fetch(`/api/fev/create/${id}`, {
      method: "POST"
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
          <div className="container flex gap-4 justify-center ">
            <>
              <img
                className="lg:w-2/6 md:w-3/6 mb-10 h-80 w-60 object-contain object-center rounded"
                alt="hero"
                src={`/api/${data.poster}`}
              />
              <div className="text-center lg:w-1/2 w-full">
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

                  <button
                  disabled={heartLoading}
                    onClick={() => handleHeart()}
                    className={`${
                      heart ? "text-red-500 duration-150 scale-125 " : ""
                    } absolute right-28 font-bold text-2xl `}
                  >
                    <FaHeart />
                  </button>
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

          <div className="flex flex-col items-center m-auto max-w-[900px] justify-center">
            <h1>Episodes</h1>
            <p className="border-t-[1px] my-3 border-slate-500 h-1 w-full" />
            <div className="flex flex-row items-center mb-3 gap-2">
              <h1 className="h-8 w-8 border-[1px] border-black text-black flex items-center text-sm justify-evenly rounded-full m-auto">
                <span>1</span>
              </h1>

              <audio
                className="w-[500px] text-red-400"
                draggable={false}
                controls={true}
              >
                {status === true || user?.role === "admin" ? (
                  <source
                    src={`/api/stream?path=${data.episodes[0]}`}
                    className=""
                    type="audio/mp3"
                  />
                ) : (
                  <source src={``} className="" type="audio/mp3" />
                )}
              </audio>
            </div>

            <p className="border-t-[1px] my-3 border-slate-500 h-1 w-full" />
          </div>

          <section className="mt-6 flex flex-col gap-6">
            {newReq.length > 0 ? (
              <>
                <section className=" max-w-[1200px] flex flex-col gap-4 m-auto mb-9">
                  <div className="ml-6 mt-2">
                    <h1 className="font-semibold text-xl">Recommend . . .</h1>
                  </div>
                  <div
                    id="scroll"
                    className="overflow-auto whitespace-nowrap mb-3"
                  >
                    {newReq?.map((item, i) => (
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
