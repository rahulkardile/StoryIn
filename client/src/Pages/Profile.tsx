import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ReduxStates } from "../Redux/Store";
import profileImg from "../assets/profile.jpg";

const Profile = () => {
  const { user, status } = useSelector((state: ReduxStates) => state.user);
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

    getOrder();
    return () => controller.abort();
  }, []);

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
                  {" "} ₹ 
                  {orderDate.amount}
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
    </div>
  );
};

export default Profile;
