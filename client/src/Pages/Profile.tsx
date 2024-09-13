import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReduxStates } from "../Redux/Store";
import { Link, useNavigate } from "react-router-dom";
import { BiDotsVerticalRounded } from "react-icons/bi";
import toast from "react-hot-toast";
import { RemoveStatus } from "../Redux/Slices/UserSlice";
import { storage } from "../firebase";
import { deleteObject, ref } from "firebase/storage";
import IOrder from "../utils/IOrder";
import IOrderList from "../utils/IOrderList";

const Profile = () => {
  const { user, status } = useSelector((state: ReduxStates) => state.user);
  const naviagte = useNavigate();
  const dispatch = useDispatch();
  const [Option, setOption] = useState<boolean>(false);
  const [Proccess, setProccess] = useState<boolean>(false);

  const noImg = "https://firebasestorage.googleapis.com/v0/b/storyin-64d8b.appspot.com/o/assets%2FerrorImage.jpg?alt=media&token=8775dd92-495a-4722-9787-2e5a66485172"
  const profileImg = "https://firebasestorage.googleapis.com/v0/b/storyin-64d8b.appspot.com/o/assets%2Fprofile.jpg?alt=media&token=668c8081-a5b3-469a-a8f6-3a8f7bb89fc7";

  const [Id, setId] = useState<string>("");

  const [orderDate, setOrderData] = useState<IOrder>({
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

  const [OrderList, setOrderList] = useState<IOrderList[]>([
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
      } else {
        dispatch(RemoveStatus());
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
          console.log(OrderList);

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

      const desertRef = ref(storage, resData.url);
      deleteObject(desertRef).then(() => {
        toast.success("deleted successfully")
      }).catch((error) => {
        toast.error("Uh-oh, an error occurred!");
        console.log(error);
      });
      setProccess(false);
      setId("");
      window.location.reload();
    } else {
      setProccess(false);
      setId("");
      toast.error("Can't Delete!");
    }
  };

  const updatePost = () => {
    naviagte(`/update/${Id}`);
  };

  const handleHeart = async () => {
    const like = await fetch(`/api/fev/create/${Id}`, {
      method: "POST",
    });

    const { message } = await like.json();
    setOption(!Option);
    toast.success(message);
  };

  return (
    <div
      className={`flex gap-2 flex-col justify-center mt-3 mb-28 m-auto  items-center p-6 rounded-lg `}
    >
      <ul
        className={`mt-2 flex absolute z-10 bg-gray-900 text-white w-80 rounded-lg h-auto flex-col py-5 items-center ${Option ? "" : "hidden"
          }`}
      >
        <button disabled={Proccess} onClick={() => updatePost()} className="">
          Edit
        </button>
        <p className="border-t-[0.5px] border-gray-300 my-2 w-[90%]" />
        <button disabled={Proccess} onClick={() => handleHeart()} className="">
          Favorite
        </button>
        <p className="border-t-[0.5px] border-gray-300 my-2 w-[90%]" />

        <Link to={"/"} className="text-center">
          Home
        </Link>
        <p className="border-t-[0.5px] border-gray-300 my-2 w-[90%]" />

        <button
          disabled={Proccess}
          onClick={() => setOption(false)}
          className=" text-center"
        >
          Close
        </button>
        <p className="border-t-[0.5px] border-gray-300 my-2 w-[90%]" />

        <button
          disabled={Proccess}
          onClick={() => handleDelete()}
          className="text-center text-red-500 font-bold"
        >
          Delete
        </button>
      </ul>

      <section
        className={`flex justify-center items-center flex-col ${Option ? "opacity-10" : ""
          }`}
      >
        <div className="flex items-center">
          <img
            draggable={false}
            src={user?.photoURL}
            onError={(e) => {
              e.currentTarget.src = profileImg
            }}
            alt="Profile"
            className="w-16 h-16 rounded-full mr-4 select-none"
          />
          <div>
            <h1 className="text-xl font-semibold select-none">{user?.name}</h1>
            <p className="text-gray-600">Web Developer</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-10">
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
              {status === true ? (
                <span className="text-green-700 font-semibold">Running </span>
              ) : (
                <span className="text-red-600 font-semibold">None</span>
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
        <section
          className={`m-auto flex flex-col justify-center w-full items-center gap-4 ${Option ? "opacity-10" : ""
            }`}
        >
          <h1 className="font-semibold portrait:text-xl my-3">My Books</h1>

          <div className="flex justify-center gap-6 sm:gap-8 sm:max-w-[78%] max-w-[93%] flex-row flex-wrap">
            {OrderList.map((item, i) => (
              <div className="flex justify-evenly mt-3 flex-col sm:w-[160px] w-[120px] h-[120px] sm:h-[181px]">
                <div className="gap-1 rounded-md h-[160px] w-[153px] overflow-hidden">
                  <Link to={`/book/${item._id}`} key={i}>
                    <img
                      draggable={false}
                      src={item.poster}
                      onError={e => {
                        e.currentTarget.src = noImg
                      }}
                      style={{ userSelect: "none" }}
                      className=" rounded-md overflow-hidden duration-300 ease-in-out hover:scale-105"
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
          <h1 className="mt-3">Create Your own audio book's by clicking to profile section . . .</h1>
        </section>
      )}
    </div>
  );
};

export default Profile;
