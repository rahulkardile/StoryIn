import React, { useState } from "react";
import toast from "react-hot-toast";
import profileImg from "../assets/profile.jpg";
import { useDispatch, useSelector } from "react-redux";
import { ReduxStates } from "../Redux/Store";
import { addStatus } from "../Redux/Slices/UserSlice";
import { useNavigate } from "react-router-dom";

const Subscription = () => {
  const { user } = useSelector((state: ReduxStates) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const checkout = async (amount: any) => {
    const data = await fetch("/api/order/key");
    const { success, key } = await data.json();

    if (success === false) {
      return toast.error("Got Error!");
    }

    const order = await fetch("/api/order/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount }),
    });

    const orderData = await order.json();

    const { amount: orderAmount, id } = orderData.order;

    const options = {
      key,
      amount: orderAmount,
      currency: "INR",
      name: "StoryIn",
      description:
        "StoryIn is a best audio book plateform to upgrade yourself by listing new audio books.",
      order_id: id,
      image: profileImg,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      handler: async (response: any) => {
        const Info = await fetch("/api/order/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            order_Id: response.razorpay_order_id,
            payment_Id: response.razorpay_payment_id,
            signature: response.razorpay_signature,
            amount: amount,
          }),
        });

        const { success } = await Info.json();

        if (success === true) {
          toast.success("Subscription Successfull");
          console.log(success);
          dispatch(addStatus());
          navigate("/");
        } else {
          toast.error("Payment Failed!");
        }
      },

      prefill: {
        name: user?.name,
        email: user?.email,
        contact: "1234567890",
      },
      notes: {
        address: "Maharashtra, Sambajinager, Padampura",
      },
      theme: {
        color: "white",
      },
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const paymentObject = await new (window as any).Razorpay(options);
    paymentObject.open();
  };

  return (
    <div className="p-6 m-auto max-w-[990px] my-9 mb-5 rounded-lg">
      <h1 className="text-2xl text-center text-black font-semibold mb-4">
        Choose Your Plan
      </h1>
      <div className="flex gap-4  items-center justify-center flex-row ">
        <div className="w-1/2 p-4 h-[250px] border rounded-lg bg-gray-100">
          <h2 className="text-lg font-semibold">Premium of 1 Months</h2>
          <p className="text-gray-600">₹119/month</p>
          <ul className="mt-4">
            <li>HD Audio Quality</li>
            <li>Premium Features</li>
            <li>Premium Features</li>
          </ul>
          <button
            onClick={() => checkout(119)}
            className="mt-4 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
          >
            Subscribe
          </button>
        </div>
        <div className="w-1/2 p-4 h-[250px] border rounded-lg bg-gray-100">
          <h2 className="text-lg font-semibold">Premium of 12 Months</h2>
          <p className="text-gray-600">₹1199/year</p>
          <ul className="mt-4">
            <li>Unlimited Downloads</li>
            <li>Login Multiple Devices</li>
            <li>HD Audio Quality</li>
            <li>Premium Features</li>
          </ul>
          <button
            onClick={() => checkout(1199)}
            className="mt-4 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
          >
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
