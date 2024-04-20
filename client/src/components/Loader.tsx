import { CgSpinner } from "react-icons/cg";

const Loader = () => {
  return (
    <div className="flex flex-row m-auto p-56 h-[20%] w-[20%] items-center justify-center gap-2  rounded-lg mt-1">
      <div className="flex gap-1 items-center">
        <CgSpinner className="animate-spin h-7 w-6 text-black" />
        <span className="text-black font-semibold">Loading...</span>
      </div>
    </div>
  );
};

export default Loader;
