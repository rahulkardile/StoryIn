import { CgSpinner } from "react-icons/cg";

const Loader = () => {
  return (
    <div className="flex bg-slate-900 flex-row p-3 items-center gap-2 px-7 rounded-lg mt-1">
      <CgSpinner
        className="animate-spin h-7 w-6 text-white"
      />
      <span className="text-white font-semibold">Loading...</span>
    </div>
  );
};

export default Loader;
