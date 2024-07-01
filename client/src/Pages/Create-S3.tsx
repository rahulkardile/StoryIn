import { ChangeEvent, FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [tags, setTags] = useState<string>("");

  const [img, setImg] = useState<File>();
  const [audio, setAudio] = useState<File>();

  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  // const ImgHandler = () => {

  // }

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {

    const file:File | undefined = e.target.files?.[0];

    if (e.target.id === "img") {
      if (e.target.files != null) {
        setImg(file);
      } else {
        toast.error("Can't upload img");
      }
    }

    if (e.target.id === "epi") {
      if (e.target.files != null) {
        setAudio(file);
      } else {
        toast.error("Can't upload img");
      }
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const formData:any = new FormData();

    formData.set("epi", audio);
    formData.set("img", img);

    formData.set("title", title);
    formData.set("description", description);
    formData.set("tags", tags);

    console.log(formData);

    const res = await fetch("/api/audio-book/new", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (data.success === true) {
      toast.success("Audio Book successfully created");
      setAudio(undefined);
      setImg(undefined);
      setDescription("");
      setTags("");
      setTitle("");
      setLoading(false);
      navigate(`/`);
    } else {
      toast.error("got an error");
      setLoading(false);
    }
  };

  return (
    <section className="flex justify-evenly flex-col gap-4 m-auto items-center mt-6 mb-24">
      <h1 className="text-2xl font-semibold">List Your Audio Book</h1>

      <form
        onSubmit={handleSubmit}
        className="flex sm:justify-between w-[90%] sm:[50%] sm:gap-8 flex-col sm:flex-row"
      >
        <div className="w-full sm:w-[50%] ml-4">

          <div className="flex flex-col w-[95%] gap-1 mb-2">
            <span className="text-xs font-medium">Name</span>
            <input
              type="text"
              id="title"
              onChange={(e) => setTitle(e.target.value)}
              className="p-2 w-[100%] border rounded"
              placeholder="Name"
              required
            />
          </div>

          <div className="flex flex-col w-[95%] gap-1 mb-2">
            <span className="text-xs font-medium">Description</span>
            <textarea
              id="description"
              className="p-5 w-[100%] border rounded"
              placeholder="Description"
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col w-[95%] gap-1 mb-2">
            <span className="text-xs font-medium">Tags</span>
            <input
              type="text"
              id="tags"
              className="p-2 w-[100%] border rounded"
              placeholder="Add Tags"
              onChange={(e) => setTags(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col w-[95%] gap-1 mb-2">
            <span className="text-xs font-medium">Image</span>
            <input
              type="file"
              id="img"
              accept="image/*"
              className="p-2 w-[100%] border rounded bg-white"
              onChange={handleFile}
              required
            />
          </div>
        </div>

        <div className="flex flex-col mt-5 w-full sm:w-[50%]">
          <div className="flex flex-row items-center gap-2 mb-2">
            <h1 className="text-base font-semibold">Audio Epicodes:</h1>
            <span className="text-sm">Add episode one after another </span>
          </div>

          <div className="mb-3">
            <input
              type="file"
              id="epi"
              accept="audio/*"
              required
              multiple
              className="p-2 w-[100%] border rounded bg-white"
              onChange={handleFile}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="p-2 bg-black text-white font-semibold disabled:opacity-85 rounded "
          >
            Upload
          </button>
        </div>
      </form>
    </section>
  );
};

export default Create;
