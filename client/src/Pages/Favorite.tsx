import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { IFavorite } from "../Interfaces/IFavorite";

const Favorite = () => {

  const noImg = "https://firebasestorage.googleapis.com/v0/b/storyin-64d8b.appspot.com/o/assets%2FerrorImage.jpg?alt=media&token=8775dd92-495a-4722-9787-2e5a66485172"
  const [data, setData] = useState<IFavorite[]>([
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

    const { message, success } = await like.json();

    if (success === true) {
      window.location.reload();
      toast.success(message);
    }
  };

  return (
    <div className="flex justify-center mt-4 mb-20 flex-col w-screen sm:w-[900px] m-auto items-center">
      <h1 className="font-semibold text-xl">Your Favorite Books</h1>
      <p className="mb-1 h-[1px] bg-gray-400 mt-1 w-96" />

      <div className="flex gap-3 flex-col items-center w-full mt-7">
        {data.length > 0 ? (
          data.map((i) => (
            <div className="flex sm:justify-start justify-center  items-center gap-3 my-4 w-[450px] overflow-hidden">
              <Link
                className="sm:border sm:border-black sm:p-1 sm:bg-gray-100 rounded"
                to={`/book/${i._id}`}
              >
                <img
                  src={`/api/${i.poster}`}
                  className="object-contain w-32 h-[200px] sm:w-56 duration-300 rounded-2xl hover:scale-105"
                  alt="poster"
                  onError={e => {
                    e.currentTarget.src = noImg
                  }}
                />
              </Link>

              <div className="sm:w-[400px] w-[220px] h-full">
                <Link to={`/book/${i._id}`}>
                  <h2 className="text-lg mb-1 truncate font-semibold">{i.title}</h2>
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
          ))
        ) : (
          <h1 className="my-2 text-sm mb-10">There is no book added to Favorite list</h1>
        )}
      </div>
    </div>
  );
};

export default Favorite;
