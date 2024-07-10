import { Link, useNavigate } from "react-router-dom";

type data = {
  img: string;
  author: string;
  bookName: string;
  id: string;
};

const noImg = "https://firebasestorage.googleapis.com/v0/b/storyin-64d8b.appspot.com/o/assets%2FerrorImage.jpg?alt=media&token=8775dd92-495a-4722-9787-2e5a66485172"

const NewCard = (data: data) => {
  const naviagte = useNavigate();

  const handleRefresh = () => {
    naviagte(`/book/${data.id}`);

    window.location.reload();
  };

  return (
    <div className="h-56 w-44 inline-block mx-4 mb-4">
      <Link onClick={handleRefresh} to={""}>
        <div className="w-[95%] h-[75%] rounded-md overflow-hidden">
          <img
            draggable={false}
            src={data.img}
            onError={(e)=> {
              e.currentTarget.src = noImg
            }}
            style={{ userSelect: "none" }}
            className="object-contain rounded-md overflow-hidden duration-300 ease-in-out hover:scale-105"
            alt="imgs"
          />
        </div>
        <h1 className="font-semibold text-sm mt-2 truncate">{data.bookName}</h1>
        <p className="text-sm truncate">{data.author}</p>
      </Link>
    </div>
  );
};

export default NewCard;
