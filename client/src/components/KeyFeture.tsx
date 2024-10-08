import { useSelector } from "react-redux";
import { ReduxStates } from "../Redux/Store";
import { Link } from "react-router-dom";

const sec = "https://firebasestorage.googleapis.com/v0/b/storyin-64d8b.appspot.com/o/assets%2FPersonalization_Block.jpeg?alt=media&token=a164ee4e-b119-4bae-bb46-4f0fa05e17c7";
const thi = "https://firebasestorage.googleapis.com/v0/b/storyin-64d8b.appspot.com/o/assets%2F3-device.png?alt=media&token=619392ed-9481-47f9-b9b0-cd4ef6413bd1";

const KeyFeture = () => {
  const { status } = useSelector((state: ReduxStates) => state.user);

  return (
    <>
      <section className="bg-white flex items-center flex-col sm:mx-auto  sm:flex-row mx-4 gap-4 sm:gap-20 max-w-[950px] justify-center mt-24 mb-24 m-auto">
        <h2 className="text-orange-500 sm:hidden text-[3rem] font-bold">
          StoryIn Original
        </h2>

        <div className="h-auto sm:w-[35%]">
          <img
            className="object-contain object-center rounded"
            src={sec}
            alt="secImg"
          />
        </div>

        <div className="sm:w-[40%] sm:text-start text-center sm:items-start items-center flex flex-col gap-2">
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

      <section className="bg-white flex items-center flex-col sm:mx-auto  sm:flex-row mx-4 gap-4 sm:gap-20 max-w-[950px] justify-center mt-24 mb-24 m-auto">
        <h2 className="text-orange-500  text-center  sm:hidden text-[3.4rem] font-bold">
          Anytime, anywhere
        </h2>

        <div className="h-auto sm:w-[35%]">
          <img
            className="object-contain object-center rounded"
            src={thi}
            alt="secImg"
          />
        </div>

        <div className="sm:w-[40%] sm:text-start text-center sm:items-start items-center flex flex-col gap-2">
          <h2 className="text-orange-500 hidden sm:block text-[4rem] font-bold max-w-7">
            Anytime, anywhere
          </h2>
          <p className="text-slate-600 text-xl">
            Read in bed – listen on the go. Download audiobooks and e-books
            offline on your favorite devices.
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
    </>
  );
};

export default KeyFeture;
