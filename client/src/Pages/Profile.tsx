import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ReduxStates } from "../Redux/Store";
import profileImg from "../assets/profile.jpg";
import { Link } from "react-router-dom";
import { BiDotsVerticalRounded } from "react-icons/bi";

const Profile = () => {
  const { user, status } = useSelector((state: ReduxStates) => state.user);
  const [Option, setOption] = useState<boolean>(false);
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

  // const handleBooks = (id: string) => {};

  return (
    <div className="flex gap-2 flex-col justify-center mt-3 mb-28 m-auto items-center p-6 rounded-lg">
      <section className="flex justify-center items-center flex-col">
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
      {user?.role === "creator" && OrderList.length > 0 ? (
        <section className="m-auto flex flex-col justify-center items-center gap-4">
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

                  <button onClick={() => setOption(!Option)}>
                    <BiDotsVerticalRounded className="text-lg font-bold" />
                  </button>
                </div>
                <div
                    className={`mt-2 flex justify-between ${
                      Option ? "hidden" : ""
                    }`}
                  >
                    <button>Edit</button>
                    <button>Delete</button>
                  </div>
              </div>
            ))}
          </div>
        </section>
      ) : (
        <h1>Your Books are Loading . . .</h1>
      )}
    </div>
  );
};

export default Profile;
