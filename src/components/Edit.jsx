import { Copy, PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { updatePaste, fetchPastes } from "../redux/pasteSlice";
import { useParams, useNavigate } from "react-router-dom";

const UpdatePaste = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const pastes = useSelector((state) => state.paste.pastes);
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");

  useEffect(() => {
    if (pastes.length === 0) {
      dispatch(fetchPastes());
    }
  }, [dispatch, pastes.length]);

  useEffect(() => {
    const paste = pastes.find((p) => p._id === id);
    if (paste) {
      setTitle(paste.title);
      setValue(paste.content);
    }
  }, [id, pastes]);

  const handleUpdate = () => {
    if (!title.trim() || !value.trim()) {
      toast.error("Please fill all the details!");
      return;
    }

    const updatedPaste = {
      title,
      content: value,
      _id: id,
    };

    dispatch(updatePaste(updatedPaste));
    toast.success("Paste updated successfully!");
    navigate("/pastes");
  };

  return (
    <div className="w-full h-full py-10 max-w-[1200px] mx-auto px-5 lg:px-0">
      <h1 className="text-2xl font-bold mb-4">Paste Application</h1>
      <div className="flex flex-col gap-y-5 items-start">
        <div className="w-full flex flex-row gap-x-4 justify-between items-center">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full text-black border border-input rounded-md p-2"
          />
          <div className="flex gap-x-2">
            <button
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 cursor-pointer"
              onClick={handleUpdate}
            >
              Update Paste
            </button>
            <button
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2.5 cursor-pointer"
              onClick={() => navigate("/")}
            >
              <PlusCircle size={20} />
            </button>
          </div>
        </div>
        <div className="w-full flex flex-col items-start relative rounded bg-opacity-10 border border-[rgba(128,121,121,0.3)] backdrop-blur-2xl">
          <div className="w-full rounded-t flex items-center justify-between gap-x-4 px-4 py-2 border-b border-[rgba(128,121,121,0.3)]">
            <div className="w-full flex gap-x-[6px] items-center select-none group">
              <div className="w-[13px] h-[13px] rounded-full flex items-center justify-center p-[1px] overflow-hidden bg-[rgb(255,95,87)]" />
              <div className="w-[13px] h-[13px] rounded-full flex items-center justify-center p-[1px] overflow-hidden bg-[rgb(254,188,46)]" />
              <div className="w-[13px] h-[13px] rounded-full flex items-center justify-center p-[1px] overflow-hidden bg-[rgb(45,200,66)]" />
            </div>
            <div className="w-fit rounded-t flex items-center justify-between gap-x-4 px-4">
              <button
                className="flex justify-center items-center transition-all duration-300 ease-in-out group"
                onClick={() => {
                  navigator.clipboard.writeText(value);
                  toast.success("Copied to Clipboard", {
                    position: "top-right",
                  });
                }}
              >
                <Copy className="group-hover:text-sucess-500" size={20} />
              </button>
            </div>
          </div>

          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Write Your Content Here...."
            className="w-full p-3 focus-visible:ring-0"
            style={{
              caretColor: "#000",
            }}
            rows={20}
          />
        </div>
      </div>
    </div>
  );
};

export default UpdatePaste;
