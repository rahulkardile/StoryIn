import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ReduxStates } from "../Redux/Store";
import profileImg from "../assets/profile.jpg";
import { Link } from "react-router-dom";
import { BiDotsVerticalRounded } from "react-icons/bi";
import toast from "react-hot-toast";

const Profile = () => {
  const { user, status } = useSelector((state: ReduxStates) => state.user);
  const [Option, setOption] = useState<boolean>(false);
  const [Proccess, setProccess] = useState<boolean>(false);

  const [Id, setId] = useState<string>("");

  const [orderDate, setOrderData] = useState({
    date: "",
    duration: "",
    email: "",
    amount: "",
    expiry: "",
    orderId: "",
    paymentId: "",
    signature: "",
    userId: "",
  });

  const [OrderList, setOrderList] = useState([
    {
      _id: "",
      title: "",
      user: "",
      poster: "",
    },
  ]);

  useEffect(() => {
    const controller = new AbortController();

    const getOrder = async () => {
      const Data = await fetch("/api/order/get", {
        signal: controller.signal,
      });

      const { success, order } = await Data.json();

      if (success === true) {
        setOrderData(order);
      }
    };

    if (user?.role === "admin" || user?.role === "creator") {
      const userList = async () => {
        const Data = await fetch("/api/audio-book/userBooks", {
          signal: controller.signal,
        });

        const { success, data } = await Data.json();

        if (success === true) {
          setOrderList(data);
        }
      };

      userList();
    }

    getOrder();
    return () => controller.abort();
  }, []);

  const handlePop = (id: string) => {
    setOption(!Option);
    setId(id);
  };

  const handleDelete = async () => {
    setProccess(true);
    const res = await fetch(`/api/audio-book/delete/${Id}`, {
      method: "DELETE",
    });
    const resData = await res.json();
    if (resData.success === true) {
      setProccess(false);
      toast.success(resData.message);
      window.location.reload();
    } else {
      setProccess(false);
      toast.error("Can't Delete!");
      window.location.reload();
    }

    console.log(resData);
  };

  return (
    <div
      className={`flex gap-2 flex-col justify-center mt-3 mb-28 m-auto  items-center p-6 rounded-lg `}
    >
      <ul
        className={`mt-2 flex absolute z-10 bg-gray-900 text-white w-80 rounded-lg h-auto flex-col py-5 items-center ${
          Option ? "" : "hidden"
        }`}
      >
        <button disabled={Proccess} onClick={() => console.log("edit")} className="">
          Edit
        </button>
        <p className="border-t-[0.5px] border-gray-300 my-2 w-[90%]" />
        <button disabled={Proccess} onClick={() => console.log("edit")} className="">
          Favorite
        </button>
        <p className="border-t-[0.5px] border-gray-300 my-2 w-[90%]" />

        <Link to={"/"} className="text-center">
          Home
        </Link>
        <p className="border-t-[0.5px] border-gray-300 my-2 w-[90%]" />

        <button disabled={Proccess} onClick={() => setOption(false)} className=" text-center">
          Close
        </button>
        <p className="border-t-[0.5px] border-gray-300 my-2 w-[90%]" />

        <button disabled={Proccess}
          onClick={() => handleDelete()}
          className="text-center text-red-500 font-bold "
        >
          Delete
        </button>
      </ul>

      <section
        className={`flex justify-center items-center flex-col ${
          Option ? "opacity-10" : ""
        }`}
      >
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
        <div className="flex flex-row gap-10">
          <div className="mt-4">
            <p className="">
              Email:{" "}
              <span className="text-black font-semibold"> {user?.email} </span>{" "}
            </p>
            <p className="">
              Gender:{" "}
              <span className="text-black font-semibold"> {user?.gender} </span>{" "}
            </p>
            <p className="">
              Phone:{" "}
              <span className="text-black font-semibold"> (123) 456-7890 </span>{" "}
            </p>
          </div>
          <div className="mt-4">
            <p>
              Subscription Status:{" "}
              {user?.status === true ? (
                <span className="text-green-700 font-semibold">Running </span>
              ) : (
                <span className="text-red-600 font-semibold">Nan</span>
              )}{" "}
            </p>
            {status === false ? (
              ""
            ) : (
              <>
                <p>
                  Due date:{" "}
                  <span className="text-green-700 font-semibold">
                    {" "}
                    {orderDate.date.slice(0, 10)}{" "}
                  </span>{" "}
                </p>
                <p>
                  expiry:{" "}
                  <span className="text-green-700 font-semibold">
                    {" "}
                    {orderDate.expiry.slice(0, 10)}
                  </span>
                </p>
                <p>
                  Duration:{" "}
                  <span className="text-green-700 font-semibold">
                    {" "}
                    {orderDate.duration}
                  </span>
                </p>
                <p>
                  Amount:{" "}
                  <span className="text-green-700 font-semibold">
                    {" "}
                    ₹{orderDate.amount}
                  </span>
                </p>
                <p>
                  Order Id:{" "}
                  <span className="text-green-700 font-semibold">
                    {" "}
                    {orderDate.orderId}
                  </span>
                </p>
              </>
            )}
          </div>
        </div>
      </section>
      {user?.role === "creator" && OrderList.length > 1 ? (
        <section
          className={`m-auto flex flex-col justify-center items-center gap-4 ${
            Option ? "opacity-10" : ""
          }`}
        >
          <h1 className="font-semibold my-3">My Books</h1>

          <div className="flex justify-evenly gap-8 flex-wrap">
            {OrderList.map((item, i) => (
              <div className="flex justify-evenly flex-col">
                <div className="w-[160px] h-[160px] gap-1 rounded-md overflow-hidden">
                  <Link to={`/book/${item._id}`} key={i}>
                    <img
                      draggable={false}
                      src={`api/${item.poster}`}
                      style={{ userSelect: "none" }}
                      className="object-fill rounded-md overflow-hidden duration-300 ease-in-out hover:scale-105"
                      alt="imgs"
                    />
                  </Link>
                </div>
                <div className="flex justify-between items-center mt-2 max-w-[160px]">
                  <h1 className="font-semibold text-sm max-w-[130px] truncate">
                    {item.title}
                  </h1>

                  <button onClick={() => handlePop(item._id)}>
                    <BiDotsVerticalRounded className="text-lg font-bold" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : (
        <section className="m-auto flex flex-col justify-center items-center gap-4">
          <h1 className="font-semibold my-3">My Books</h1>
          <h1 className="mt-3">Your Books are Loading . . .</h1>
        </section>
      )}
    </div>
  );
};

export default Profile;
