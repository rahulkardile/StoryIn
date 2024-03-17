import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Favorite = () => {
  const [data, setData] = useState([
    {
      _id: "",
      title: "",
      description: "",
      poster: "",
      tags: "",
    },
  ]);

  useEffect(() => {
    const controller = new AbortController();

    const getList = async () => {
      const data = await fetch("/api/fev/userList", {
        signal: controller.signal,
      });
      const bookData = await data.json();

      setData(bookData);
    };

    getList();

    return () => controller.abort();
  }, []);

  const handleRemove = async (id: string) => {
    const like = await fetch(`/api/fev/create/${id}`, {
      method: "POST",
    });

    const { message } = await like.json();
    window.location.reload();
    toast.success(message);

  };

  return (
    <div className="flex justify-center mt-4 mb-20 flex-col w-[900px] m-auto items-center">
      <h1 className="font-semibold text-xl">Your Favorite Books</h1>
      <p className="mb-1 h-[1px] bg-gray-400 mt-1 w-96" />

      <div className="flex gap-3 flex-col items-center w-full mt-7">
        { data.length > 0 ? data.map((i) => (
          <div className="flex justify-start gap-3 my-4 w-[550px]">
            <Link to={`/book/${i._id}`}>
              <img
                src={`/api/${i.poster}`}
                className="bg-slate-200  object-contain w-40 h-40 duration-300 rounded-lg hover:scale-105 overflow-hidden"
                alt="poster"
              />
            </Link>

            <div className="w-[400px] h-full">
              <Link to={`/book/${i._id}`}>
                <h2 className="text-lg mb-1 font-semibold">{i.title}</h2>
              </Link>
              <h2 className="text-sm line-clamp-3">{i.description}</h2>
              <button
                onClick={() => handleRemove(i._id)}
                className="text-blue-700 mt-5"
              >
                remove
              </button>
            </div>
          </div>
        )) : <h1 className="my-2 text-sm mb-10">Add books from home page</h1>}
      </div>
    </div>
  );
};

export default Favorite;
