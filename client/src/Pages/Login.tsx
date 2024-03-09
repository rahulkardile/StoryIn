import React, { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";
import { FaGoogle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addStatus, addUser } from "../Redux/Slices/UserSlice";

const Login = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // redux
  const dispatch = useDispatch();

  // Handle Functions
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleManual = async (e: SubmitEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/user/get", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (data.success === false || !data) {
      setLoading(false);
      toast.error(data.message);
    } else {
      toast.success(`Welcome Back ${data.name}`);
      dispatch(addUser(data));
      setLoading(false);

      if(data.status === true){
        dispatch(addStatus());
      }
      
      navigate("/");
    }
    setLoading(false);
  };

  const HandleGoogle = () => {};

  return (
    <main className="max-w-[500px] flex flex-col gap-3 justify-center items-center m-auto mt-14 mb-28">
      <div className="w-full flex justify-center flex-col">
        <h1 className="text-black font-bold text-3xl">Welcome Back!</h1>
        <p className="text-sm tracking-wider">
          {" "}
          Welcome Back! Please enter your details
        </p>
      </div>
      <form
        onSubmit={handleManual}
        className="w-full flex justify-start flex-col gap-6"
      >
        <div className="w-full">
          <p className="text-gray-950">Email</p>
          <input
            type="email"
            className="p-[10px] w-[75%] text-sm rounded border-gray-700 border-[1px]"
            required
            placeholder="email"
            id="email"
            onChange={handleChange}
          />
        </div>
        <div className="w-full">
          <p className="text-gray-950">Password</p>
          <input
            type="password"
            className="p-[10px] w-[75%] text-sm rounded border-gray-700 border-[1px]"
            required
            placeholder="password"
            id="password"
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="bg-black text-white font-semibold p-[10px] w-[75%] rounded-md  duration-300 ease-in-out hover:scale-105"
          disabled={loading}
        >
          Login
        </button>
      </form>

      <div className="w-full flex flex-col gap-3">
        <button
          disabled={loading}
          className="p-[10px] mb-2 flex flex-row items-center gap-3 justify-center font-semibold rounded-md bg-white border border-slate-800 w-[75%] duration-300 ease-in-out hover:shadow-2xl "
          onClick={HandleGoogle}
        >
          <FaGoogle />
          Continue with Google
        </button>
        <p>
          Don't Have an account ?
          <Link to={"/register"} className="font-semibold">
            {" "}
            Register
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Login;
