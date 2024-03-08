import React from "react";
import { useSelector } from "react-redux";
import { ReduxStates } from "../Redux/Store";
import profileImg from "../assets/profile.jpg";

const Profile = () => {
  const { user } = useSelector((state: ReduxStates) => state.user);

  return (
    <div className="flex gap-2 flex-col justify-center mt-3 mb-28 m-auto items-center p-6 rounded-lg">
      <div className="flex items-center">
        <img
          draggable={false}
          src={profileImg}
          alt="Profile"
          className="w-16 h-16 rounded-full mr-4 select-none"
        />
        <div>
          <h1 className="text-xl font-semibold select-none">{user?.name}</h1>
          <p className="text-gray-600">Web Developer</p>
        </div>
      </div>
      <div className="mt-4">
        <p>Email: {user?.email}</p>
        <p>Gender: {user?.gender}</p>
        <p>Phone: (123) 456-7890</p>
      </div>
    </div>
  );
};

export default Profile;
