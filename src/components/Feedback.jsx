import React, { useState, useEffect } from "react";
import { ThumbsUp, ThumbsDown, Send } from "lucide-react"; // Import icons
import toast from "react-hot-toast";

const Feedback = ({ isAdmin }) => {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [comment, setComment] = useState("");
  const [commentsList, setCommentsList] = useState([]);

  useEffect(() => {
    // Load existing feedback from local storage
    const storedLikes = localStorage.getItem("likes");
    const storedDislikes = localStorage.getItem("dislikes");
    const storedComments = JSON.parse(localStorage.getItem("comments")) || [];

    if (storedLikes) setLikes(Number(storedLikes));
    if (storedDislikes) setDislikes(Number(storedDislikes));
    setCommentsList(storedComments);
  }, []);

  const handleLike = () => {
    setLikes(likes + 1);
    localStorage.setItem("likes", likes + 1);
    toast.success("Liked successfully!");
  };

  const handleDislike = () => {
    setDislikes(dislikes + 1);
    localStorage.setItem("dislikes", dislikes + 1);
    toast.success("Disliked successfully!");
  };

  const handleCommentSubmit = () => {
    if (comment.trim()) {
      const updatedComments = [...commentsList, comment];
      setCommentsList(updatedComments);
      localStorage.setItem("comments", JSON.stringify(updatedComments));
      setComment(""); // Clear the comment input
      toast.success("Your message has been sent!");
    } else {
      toast.error("Please enter a comment.");
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg mt-8 width-full mx-auto">
      <div className="flex justify-between items-center gap-3">
        <div className="flex gap-4">
            <button onClick={handleLike} className="flex items-center cursor-pointer hover:text-green-500">
                <ThumbsUp size={40} className="transition-colors duration-200" />
            </button>
          <button onClick={handleDislike} className="flex items-center cursor-pointer hover:text-red-500">
            <ThumbsDown size={40} className="transition-colors duration-200" />
          </button>
        </div>
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Leave a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="p-2 rounded-md bg-gray-700 text-white w-full"
          />
          <button onClick={handleCommentSubmit} className="ml-2">
            <Send size={20} className="text-white" />
          </button>
        </div>
      </div>
      {isAdmin && (
        <div className="mt-4">
          <h3 className="text-lg font-bold">Comments:</h3>
          <ul>
            {commentsList.map((c, index) => (
              <li key={index} className="text-gray-400">{c}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Feedback;