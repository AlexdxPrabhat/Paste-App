import React, { useState } from "react";
import Navbar from "./Navbar";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPastes } from "../Redux/pasteItSlice";
import { toast } from "react-toastify";
import { NavLink, useSearchParams } from "react-router-dom";

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm, setSearchTerm] = useState("");

  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "short",
  };

  const dispatch = useDispatch();
  
  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLocaleLowerCase())
  );

  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
  }
  return (
    <div className="my-5 max-w-7xl mx-auto flex flex-col gap-3 px-2 sm:px-0">
      <input
        className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 border border-gray-300 dark:border-gray-600 p-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 transition-all duration-200"
        type="search"
        placeholder="Search pastes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="flex flex-col gap-4 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 sm:p-6 shadow-md bg-white dark:bg-gray-950">
        {filteredData.length > 0 ? (
          filteredData.map((paste) => (
            <div
              key={paste._id}
              className="flex flex-col sm:flex-row border border-gray-200 dark:border-gray-700 rounded-2xl p-4 hover:bg-blue-500 dark:hover:bg-gray-900 transition-all duration-200 shadow-sm"
            >
              <div className="w-full sm:w-[70%] flex flex-col gap-2">
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white leading-snug tracking-tight">
                  {paste.title || "Untitled Paste"}
                </h4>
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap break-words text-sm leading-relaxed font-sans">
                  {paste.content.length > 100
                    ? `${paste.content.substring(0, 100)}...`
                    : paste.content}
                </p>
              </div>

              <div className="w-full sm:w-[30%] mt-4 sm:mt-0 flex flex-col sm:items-end gap-3">
                <div className="flex flex-wrap gap-2 justify-center sm:justify-end">
                  <NavLink
                    to={`/?pasteId=${paste._id}`}
                    className="p-2 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors text-gray-600 dark:text-gray-300"
                    title="Edit"
                  >
                    ✏️
                  </NavLink>
                  <NavLink
                    to={`/pastes/${paste._id}`}
                    className="p-2 rounded-lg hover:bg-green-100 dark:hover:bg-green-900 transition-colors text-gray-600 dark:text-gray-300"
                    title="View"
                  >
                    👁️
                  </NavLink>
                  <button
                    onClick={() => handleDelete(paste._id)}
                    className="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900 transition-colors text-gray-600 dark:text-gray-300"
                    title="Delete"
                  >
                    🗑️
                  </button>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(paste.content);
                      toast.success("Content copied!");
                    }}
                    className="p-2 rounded-lg hover:bg-yellow-100 dark:hover:bg-yellow-800 transition-colors text-gray-600 dark:text-gray-300"
                    title="Copy content"
                  >
                    ⧉
                  </button>
                  <button
                    onClick={() => {
                      const shareLink = `${window.location.origin}/pastes/${paste._id}`;
                      navigator.clipboard
                        .writeText(shareLink)
                        .then(() => toast.success("Link copied!"))
                        .catch(() => toast.error("Failed to copy"));
                    }}
                    className="p-2 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900 transition-colors text-gray-600 dark:text-gray-300"
                    title="Share"
                  >
                    🔗
                  </button>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 font-sans">
                  {paste.createdAt &&
                    new Date(paste.createdAt).toLocaleString("en-IN")}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-10 text-gray-500 dark:text-gray-400 text-base font-medium font-sans">
            No pastes found matching your search
          </div>
        )}
      </div>
    </div>
  );
};

export default Paste;
