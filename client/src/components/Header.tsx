import { useState } from "react";
import { IoHeadsetSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ReduxStates } from "../Redux/Store";
import toast from "react-hot-toast";
import { RemoveUser } from "../Redux/Slices/UserSlice";
import profileImg from "../assets/profile.jpg";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dropDown, setDropDown] = useState(false);
  const { user } = useSelector((state: ReduxStates) => state.user);

  const handleLogout = async () => {
    const res = await fetch("/api/user/logout");
    const data = await res.json();

    if (data.success === true) {
      toast.success("Logout success");
      dispatch(RemoveUser());
      navigate("/");
    } else {
      toast.error("can't logout");
    }
  };

  return (
    <header className="p-3 relative bg-black flex justify-between items-center select-none">
      <div className="ml-4 flex flex-row gap-1 items-center">
        <Link to={"/"}>
          <h1 className="text-white flex gap-1 items-center text-3xl font-semibold duration-300  hover:text-orange-500">
            <IoHeadsetSharp /> StoryIn
          </h1>
        </Link>
        client
      </div>

      <div className="text-white flex items-center gap-4 text-sm mr-10">
        <Link
          to={"/audio-books"}
          className="duration-200 hover:text-orange-500 cursor-pointer"
        >
          Audiobooks
        </Link>
        <Link
          to={"/ebooks"}
          className="duration-200 hover:text-orange-500 cursor-pointer"
        >
          eBooks
        </Link>
        <Link
          to={"/"}
          className="duration-200 hover:text-orange-500 cursor-pointer"
        >
          Home
        </Link>
        <p className="border border-white py-3" />

        {user?.name ? (
          <>
            <div className="flex justify-center items-center flex-col gap-3">
              <img
                onClick={() => setDropDown(!dropDown)}
                src={profileImg}
                className="w-9 h-9 rounded-full cursor-pointer"
                alt=""
              />
              <dialog
                open={dropDown}
                className="z-10 left-[88%] w-24 bg-grey-100 rounded-lg top-14"
              >
                <div
                  id="myDropdown"
                  className={`flex my-2 items-center flex-col justify-evenly gap-1`}
                >
                  <Link
                    to={"/create"}
                    className="duration-200 hover:text-orange-500 cursor-pointer"
                  >
                    Create
                  </Link>
                  <Link
                    to={"/profile"}
                    className="duration-200 hover:text-orange-500 cursor-pointer"
                  >
                    Profile
                  </Link>
                  <Link
                    to={"/admin"}
                    className="duration-200 hover:text-orange-500 cursor-pointer"
                  >
                    Admin
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="duration-200 hover:text-red-600"
                  >
                    Logout
                  </button>
                </div>
              </dialog>
            </div>
          </>
        ) : (
          <Link to={"/login"} className="duration-200 hover:text-red-700">
            Login
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;

{
  /* <>
            
          </> */
}
