import React from "react";
import { useSelector } from "react-redux";

const AdminPage = () => {
  const likes = Number(localStorage.getItem("likes")) || 0;
  const dislikes = Number(localStorage.getItem("dislikes")) || 0;
  const commentsList = JSON.parse(localStorage.getItem("comments")) || [];

  const handleClearFeedback = () => {
    localStorage.removeItem("likes");
    localStorage.removeItem("dislikes");
    localStorage.removeItem("comments");
    window.location.reload(); // Reload the page to reflect changes
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