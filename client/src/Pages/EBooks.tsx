import Card from "../components/Card";
import { FaCaretRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { ReduxStates } from "../Redux/Store";

const EBooks = () => {

  const img = "https://firebasestorage.googleapis.com/v0/b/storyin-64d8b.appspot.com/o/assets%2Fpexels-perfecto-capucine-1324859.jpg?alt=media&token=a4fffe00-2150-4a67-b022-865c1615a501"
  const Robo = "https://firebasestorage.googleapis.com/v0/b/storyin-64d8b.appspot.com/o/assets%2FerrorImage.jpg?alt=media&token=8775dd92-495a-4722-9787-2e5a66485172"
  const Karn = "https://firebasestorage.googleapis.com/v0/b/storyin-64d8b.appspot.com/o/assets%2FerrorImage.jpg?alt=media&token=8775dd92-495a-4722-9787-2e5a66485172"

  const { status } = useSelector((state: ReduxStates) => state.user)

  return (
    <section className="h-[1300px] w-full">
      <div className="h-[40%] w-full relative flex items-center gap-2 flex-col">
        <div className="h-[100%] absolute overflow-hidden w-full">
          <img src={img} className="object-cover" alt="img" />
        </div>

        <div
          style={{
            boxShadow: "10px -110px 70px black inset",
          }}
          className="relative mt-[340px] flex flex-col gap-3 w-full"
        >
          <h1 className="ml-14 text-5xl text-orange-500 font-bold">eBooks</h1>
          <p className="ml-14 text-base text-white max-w-[450px]">
            Get access to more than 250 000 + eBooks – new content is added
            daily. Start now. Read anytime, anywhere.
          </p>
          {
            status === false ? <button className="p-3 bg-white mx-14 text-black max-w-52 mb-5 rounded-lg text-base font-bold hover:opacity-80">
              Subscribe Now
            </button> : ""
          }
        </div>
      </div>
      <div className="max-w-[1300px] ml-8 m-auto mt-3">
        <Link
          className="underline text-sm font-semibold flex items-center text-orange-500"
          to={"/"}
        >
          Home
          <FaCaretRight className="text-gray-600" />
        </Link>

        <section className="mr-8">
          <section className="overflow-hidden flex mt-3 flex-col gap-4 m-auto">
            <Card
              img={Robo}
              id="12445"
              author="Robot Kiyosaki"
              bookName="Rich Dad Poor Dad"
              title="Stories to start with"
            />
          </section>

          <section className="overflow-hidden flex flex-col gap-4 m-auto">
            <Card
              img={Karn}
              id="23133"
              author="Shivaji Sawant"
              bookName="Mrutyunjay Bhag 1 - Karn"
              title="Stories to start with"
            />
          </section>
        </section>
      </div>
    </section>
  );
};

export default EBooks;
