import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { ReduxStates } from "../Redux/Store";
import { addStatus } from "../Redux/Slices/UserSlice";
import { useNavigate } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6"

const Subscription = () => {
  const { user } = useSelector((state: ReduxStates) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const profileImg = "https://firebasestorage.googleapis.com/v0/b/storyin-64d8b.appspot.com/o/assets%2Fprofile.jpg?alt=media&token=668c8081-a5b3-469a-a8f6-3a8f7bb89fc7";


  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const checkout = async (amount: any) => {
    const data = await fetch("/api/order/key");
    const { success, key } = await data.json();

    if (success === false) {
      return toast.error("Got Error!");
    }

    const order = await fetch("/api/order/checkout", {
      method: "POST",
      credentials: 'same-origin',
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
          credentials: 'include',
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
    <div className="p-6 m-auto max-w-[990px] mb-12 rounded-lg">
      <h1 className="text-2xl text-center text-black font-semibold mb-4">
        Choose Your Plan
      </h1>

      <div className="flex gap-4  items-center justify-center flex-col sm:flex-row ">
        <div className="w-10/12 p-4 h-auto border rounded-lg flex flex-col gap-1 items-center bg-gray-100">
          <h2 className="text-lg font-semibold">Premium of 1 Months</h2>
          <p className="text-gray-600 flex items-center gap-1">
            <span className="text-lg font-semibold text-black">₹119</span>{" "}
            <span className="line-through">₹199</span>
          </p>

          <ul className="mt-4">
            <li className="flex mt-2 flex-row gap-1 "> <div className="w-7 h-7 rounded-full flex items-center justify-center bg-zinc-300 "> <FaCheck className="text-xs" /> </div> <span>HD Audio Quality</span> </li>
            <li className="flex mt-2 flex-row gap-1 "> <div className="w-7 h-7 rounded-full flex items-center justify-center bg-zinc-300 "> <FaCheck className="text-xs" /> </div> <span>Premium Features</span> </li>
            <li className="flex mt-2 flex-row gap-1 "> <div className="w-7 h-7 rounded-full flex items-center justify-center bg-zinc-300 "> <FaCheck className="text-xs" /> </div> <span>Unlimited Downloads</span> </li>
            <li className="flex mt-2 flex-row gap-1 "> <div className="w-7 h-7 rounded-full flex items-center justify-center bg-zinc-300 "> <FaXmark className="text-xs" /> </div> <span>Login Multiple Devices</span> </li>
          </ul>

          <button
            onClick={() => checkout(119)}
            className="mt-4 bg-orange-500 text-white px-4 py-2 w-full rounded hover:bg-orange-600"
          >
            Subscribe
          </button>
        </div>

        <div className="w-10/12 p-4 h-auto border rounded-lg flex flex-col gap-1 items-center bg-gray-100">
          <h2 className="text-lg font-semibold">Premium of 12 Months</h2>
          <p className="text-gray-600 flex items-center gap-1">
            {" "}
            <span className="text-lg font-semibold text-black">₹1199</span>{" "}
            <span className="line-through">₹1899</span>
          </p>

          <ul className="mt-4">
            <li className="flex mt-2 flex-row gap-1 "> <div className="w-7 h-7 rounded-full flex items-center justify-center bg-zinc-300 "> <FaCheck className="text-xs" /> </div> <span>HD Audio Quality</span> </li>
            <li className="flex mt-2 flex-row gap-1 "> <div className="w-7 h-7 rounded-full flex items-center justify-center bg-zinc-300 "> <FaCheck className="text-xs" /> </div> <span>Premium Features</span> </li>
            <li className="flex mt-2 flex-row gap-1 "> <div className="w-7 h-7 rounded-full flex items-center justify-center bg-zinc-300 "> <FaCheck className="text-xs" /> </div> <span>Unlimited Downloads</span> </li>
            <li className="flex mt-2 flex-row gap-1 "> <div className="w-7 h-7 rounded-full flex items-center justify-center bg-zinc-300 "> <FaCheck className="text-xs" /> </div> <span>Login Multiple Devices</span> </li>
          </ul>

          <button
            onClick={() => checkout(1199)}
            className="mt-4 bg-orange-500 text-white px-4 py-2 w-full rounded hover:bg-orange-600"
          >
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
