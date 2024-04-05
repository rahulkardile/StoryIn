import { useState } from "react";
import { IoHeadsetSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ReduxStates } from "../Redux/Store";
import toast from "react-hot-toast";
import {
  RemoveStatus,
  RemoveUser,
  changeRole,
} from "../Redux/Slices/UserSlice";
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
      dispatch(RemoveStatus());
      navigate("/");
    } else {
      toast.error("can't logout");
    }
  };

  const handleBecome = async () => {
    const res = await fetch("/api/user/become");
    const { success, message } = await res.json();

    if (success === true) {
      toast.success(message);
      dispatch(changeRole());
    } else {
      toast.error(message);
    }
  };

  return (
    <header
      onMouseLeave={() => setDropDown(false)}
      className="p-3 relative bg-black flex justify-between items-center select-none"
    >
      <div className="ml-4 flex flex-row gap-1 items-center">
        <Link to={"/"}>
          <h1 className="text-white flex gap-1 items-center text-lg sm:text-3xl font-semibold duration-300  hover:text-orange-500">
            <IoHeadsetSharp /> StoryIn
          </h1>
        </Link>
        client
      </div>

      <div className="text-white flex items-center gap-3 sm:gap-4 mr-5 sm:mr-10">
        <Link
          to={"/audio-books"}
          className="duration-200 hidden text-base sm:block hover:text-orange-500 cursor-pointer"
        >
          Audiobooks
        </Link>

        <Link
          to={"/favorite"}
          className="duration-200 text-xs sm:text-base hover:text-orange-500 cursor-pointer"
        >
          Favorite
        </Link>
        <Link
          to={"/about"}
          className="duration-200 hidden text-base sm:block hover:text-orange-500 cursor-pointer"
        >
          About
        </Link>
        <Link
          to={"/"}
          className="duration-200 text-xs sm:text-base hover:text-orange-500 cursor-pointer"
        >
          Home
        </Link>
        <p className="border text-xs sm:text-base border-white py-3" />

        {user?.name ? (
          <>
            <div className="flex justify-center items-center flex-col gap-3">
              <img
                onClick={() => setDropDown(!dropDown)}
                onMouseEnter={() => setDropDown(true)}
                src={profileImg}
                className="w-7 h-7 sm:w-9 sm:h-9 rounded-full cursor-pointer"
                alt=""
              />
              <dialog
                onMouseLeave={() => setDropDown(false)}
                open={dropDown}
                className="z-10 left-[69%] sm:left-[88%] w-auto mr-5 bg-grey-100 rounded-lg top-14"
              >
                <div
                  id="myDropdown"
                  className={`flex my-2 items-center w-auto flex-col justify-evenly gap-1`}
                >
                  {user.role === "admin" || user.role === "creator" ? (
                    <Link
                      to={"/create"}
                      className="duration-200 hover:text-orange-500 cursor-pointer"
                    >
                      Create
                    </Link>
                  ) : (
                    <button
                      onClick={handleBecome}
                      className="duration-200 hover:text-red-600"
                    >
                      become creator
                    </button>
                  )}
                  <Link
                    to={"/profile"}
                    className="duration-200 hover:text-orange-500 cursor-pointer"
                  >
                    Profile
                  </Link>
                  {user.role === "admin" ? (
                    <Link
                      to={"/admin"}
                      className="duration-200 hover:text-orange-500 cursor-pointer"
                    >
                      Admin
                    </Link>
                  ) : (
                    ""
                  )}

                  <button
                    onClick={handleLogout}
                    className="duration-200 text-xs sm:text-base hover:text-red-600"
                  >
                    Logout
                  </button>
                </div>
              </dialog>
            </div>
          </>
        ) : (
          <Link to={"/login"} className="duration-200  text-xs sm:text-base hover:text-red-700">
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
