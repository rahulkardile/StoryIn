import { useEffect, useState } from "react";
import { FaCaretRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import NewCard from "../components/NewCard";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { ReduxStates } from "../Redux/Store";
import { IHomeAPI } from "../Interfaces/IHome";

const mainImg = "https://firebasestorage.googleapis.com/v0/b/storyin-64d8b.appspot.com/o/assets%2FCover.jpg?alt=media&token=8e4ddda0-d60f-41f9-9170-aa09e255738b";

const AudioBooks = () => {
  const [data, setData] = useState<IHomeAPI[]>([{
    _id: "",
    poster: "",
    title: "",
    user: {
      name: ""
    }
  }]);
  console.log(data);
  
  const [Trending, setTrending] = useState<IHomeAPI[]>([{
    _id: "",
    poster: "",
    title: "",
    user: {
      name: ""
    }
  }]);
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
        </section>
      </div>
    </section>
  );
};

export default AudioBooks;

