import React, { useEffect, useState } from "react";
import { getFeedback , clearFeedback } from "../utils/firestore";

const AdminPage = () => {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [commentsList, setCommentsList] = useState([]);

  useEffect(() => {
    const fetchFeedback = async () => {
      const likesData = await getFeedback("likes");
      const dislikesData = await getFeedback("dislikes");
      const commentsData = await getFeedback("comments");

      setLikes(likesData.length);
      setDislikes(dislikesData.length);
      setCommentsList(commentsData.map(c => c.text));
    };

    fetchFeedback();
  }, []);

  const handleClearFeedback = async () => {
    await clearFeedback("likes");
    await clearFeedback("dislikes");
    await clearFeedback("comments");
    window.location.reload();
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen p-5">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="mb-4">
        <h2 className="text-xl">Feedback Summary</h2>
        <p>Likes: {likes}</p>
        <p>Dislikes: {dislikes}</p>
      </div>
      <h2 className="text-xl">Comments:</h2>
      <table className="min-w-full border border-gray-600">
        <thead>
          <tr>
            <th className="border border-gray-600 p-2">Comment</th>
          </tr>
        </thead>
        <tbody>
          {commentsList.length > 0 ? (
            commentsList.map((comment, index) => (
              <tr key={index}>
                <td className="border border-gray-600 p-2">{comment}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="border border-gray-600 p-2 text-center">No Comments</td>
            </tr>
          )}
        </tbody>
      </table>
      <button
        onClick={handleClearFeedback}
        className="mt-4 bg-red-600 text-white px-4 py-2 rounded"
      >
        Clear All Feedback
      </button>
    </div>
  );
};

export default AdminPage;