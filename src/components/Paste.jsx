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
    <div className="my-5 flex flex-col gap-3 px-2 sm:px-0">
      <input
        className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 border border-gray-300 dark:border-gray-600 p-2 rounded-lg "
        type="search"
        placeholder="Search pastes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="flex flex-col gap-3 border border-gray-200 dark:border-gray-700 rounded-lg p-2 sm:p-3">
        {filteredData.length > 0 ? (
          filteredData.map((paste) => (
            <div
              key={paste._id}
              className="flex flex-col sm:flex-row border border-gray-200 dark:border-gray-700 rounded-lg p-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <div className="w-full sm:w-[70%] flex flex-col gap-2">
                <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                  {paste.title || "Untitled Paste"}
                </h4>
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap break-words">
                  {paste.content.length > 100
                    ? `${paste.content.substring(0, 100)}...`
                    : paste.content}
                </p>
              </div>

              
              <div className="w-full sm:w-[30%] mt-3 sm:mt-0 flex flex-col  sm:items-end gap-3 ">
                <div className="flex flex-wrap gap-2 justify-center sm:justify-end">
                  <NavLink
                    to={`/?pasteId=${paste._id}`}
                    className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    title="Edit"
                  >
                    ✏️
                  </NavLink>
                  <NavLink
                    to={`/pastes/${paste._id}`}
                    className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    title="View"
                  >
                    👁️
                  </NavLink>
                  <button
                    onClick={() => handleDelete(paste._id)}
                    className="p-2 rounded-full hover:bg-red-100 dark:hover:bg-red-900 transition-colors"
                    title="Delete"
                  >
                    🗑️
                  </button>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(paste.content);
                      toast.success("Content copied!");
                    }}
                    className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
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
                    className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    title="Share"
                  >
                    🔗
                  </button>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {paste.createdAt &&
                    new Date(paste.createdAt).toLocaleString("en-IN")}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-6 text-gray-500 dark:text-gray-400">
            No pastes found matching your search
          </div>
        )}
      </div>
    </div>
  );
};

export default Paste;
