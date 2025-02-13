'use client'
import { Copy, PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { createNewPaste } from "../redux/pasteSlice";
import { useSearchParams, useNavigate } from "react-router-dom"; // Import useNavigate
import Feedback from "./Feedback";

const Home = () => {
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const navigate = useNavigate(); // Hook for navigation
  const [isAdmin, setIsAdmin] = useState(false); // State to track admin access

  const createPaste = () => {
    // Validation check
    if (!title.trim() || !value.trim()) {
      toast.error("Please fill all the details!");
      return;
    }

    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(36) + Math.random().toString(36).substring(2),
      createdAt: new Date().toISOString(),
    };

    dispatch(createNewPaste(paste));
    setTitle("");
    setValue("");
    setSearchParams({});
  };

  const resetPaste = () => {
    setTitle("");
    setValue("");
    setSearchParams({});
  };

  const handleAdminClick = () => {
    const password = prompt("Enter admin password:");
    if (password === import.meta.env.VITE_ADMIN_PASSWORD) {
      setIsAdmin(true);
      navigate("/admin"); // Navigate to the admin page
      toast.success("Admin access granted!");
    } else {
      toast.error("Incorrect password!");
    }
  };

  return (
    <div className="w-full h-full py-10 max-w-[1200px] mx-auto px-5 lg:px-0">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Paste Application</h1>
        <button
          onClick={handleAdminClick}
          className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer"
        >
          Admin
        </button>
      </div>
      <div className="flex flex-col gap-y-5 items-start">
        <div className="w-full flex flex-row gap-x-4 justify-between items-center">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`${
              pasteId ? "w-[80%]" : "w-[85%]"
            } text-black border border-input rounded-md p-2`}
          />
          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 cursor-pointer"
            onClick={createPaste}
          >
            Create My Paste
          </button>
        </div>

        <div
          className={`w-full flex flex-col items-start relative rounded bg-opacity-10 border border-[rgba(128,121,121,0.3)] backdrop-blur-2xl`}
        >
          <div
            className={`w-full rounded-t flex items-center justify-between gap-x-4 px-4 py-2 border-b border-[rgba(128,121,121,0.3)]`}
          >
            <div className="w-full flex gap-x-[6px] items-center select-none group">
              <div className="w-[13px] h-[13px] rounded-full flex items-center justify-center p-[1px] overflow-hidden bg-[rgb(255,95,87)]" />
              <div className={`w-[13px] h-[13px] rounded-full flex items-center justify-center p-[1px] overflow-hidden bg-[rgb(254,188,46)]`} />
              <div className="w-[13px] h-[13px] rounded-full flex items-center justify-center p-[1px] overflow-hidden bg-[rgb(45,200,66)]" />
            </div>
            <div className={`w-fit rounded-t flex items-center justify-between gap-x-4 px-4`}>
              <button
                className={`flex justify-center items-center transition-all duration-300 ease-in-out group cursor-pointer`}
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
            {/* Show Feedback component at the bottom */}
            <Feedback isAdmin={isAdmin} />
       
      </div>
    </div>
  );
};

export default Home;
