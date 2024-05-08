import React, { FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const Create = () => {
  const [data, setData] = useState({
    title: "",
    description: "",
    tags: "",
  });

  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const controller = new AbortController();

    const getPrev = async () => {
      const res = await fetch(`https://storyin-1.onrender.com/api/audio-book/getu/${id}`, {
        signal: controller.signal,
        method: "GET",
      });

      const { title, description, tags } = await res.json();
      setData({
        title,
        description,
        tags,
      });
    };

    getPrev();
    return () => controller.abort();
  }, []);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setData({
      ...data,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch(`https://storyin-1.onrender.com/api/audio-book/update/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const { success, message } = await res.json();

    if (success === true) {
      toast.success(message);

      setData({
        description: "",
        tags: "",
        title: "",
      });
      setLoading(false);
      navigate(`/book/${id}`);
    } else {
      toast.error("got an error");
      setLoading(false);
    }
  };

  console.log(data);

  return (
    <section className="flex justify-evenly flex-col gap-4 m-auto items-center mt-6 mb-24">
      <h1 className="text-2xl font-semibold">Update Your Audio Book</h1>

      <form
        onSubmit={handleSubmit}
        className="flex justify-between w-[70%]  gap-8  flex-row"
      >
        <div className="p-3 w-[50%] ml-4">
          <div className="flex flex-col gap-1 mb-2">
            <span className="text-xs font-medium">Name</span>
            <input
              type="text"
              id="title"
              onChange={(e) => handleChange(e)}
              value={data.title}
              className="p-2 w-[100%] border rounded"
              placeholder="Name"
              required
            />
          </div>

          <div className="flex flex-col gap-1 mb-2">
            <span className="text-xs font-medium">Description</span>
            <textarea
              id="description"
              className="p-5 w-[100%] border rounded"
              value={data.description}
              placeholder="Description"
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div className="flex flex-col gap-1 mb-2">
            <span className="text-xs font-medium">Tags</span>
            <input
              type="text"
              id="tags"
              className="p-2 w-[100%] border rounded"
              placeholder="Add Tags"
              value={data.tags}
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div className="flex flex-col gap-1 mb-2">
            <span className="text-xs font-medium">Image</span>
            <input
              type="file"
              id="img"
              accept="image/*"
              className="p-2 w-[100%] border rounded bg-white"
              onChange={()=>console.log("handleFile")}
            />
          </div>
        </div>
        <div className="flex flex-col mt-5 w-[50%]">
          <div className="flex flex-row items-center gap-2 mb-2">
            <h1 className="text-base font-semibold">Audio Epicodes:</h1>
            <span className="text-sm">Add episode one after another </span>
          </div>

          <div className="mb-3">
            <input
              type="file"
              id="epi"
              accept="audio/*"
              multiple
              className="p-2 w-[100%] border rounded bg-white"
              onChange={()=>console.log("handleFile")}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="p-2 bg-black text-white font-semibold disabled:opacity-85 rounded "
          >
            Update
          </button>
        </div>
      </form>
    </section>
  );
};

export default Create;
