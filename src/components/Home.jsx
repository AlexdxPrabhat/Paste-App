import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { addToPastes, updateToPastes } from "../Redux/pasteItSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const Home = () => {
  const [title, setTitle] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const allPaste = useSelector((state) => state.paste.pastes);

  useEffect(() => {
    console.log("asdf");
    if (pasteId) {
      const paste = allPaste.find((p) => p._id === pasteId);
      console.log("pageFound");
      setTitle(paste.title);
      setValue(paste.content);
    }
  }, [pasteId]);

  function createPaste() {
    if (!title.trim() || !value.trim()) {
      toast.error("Title and Content Cannot be Empty");
      return;
    }
    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {
      //update
      dispatch(updateToPastes(paste));
    } else {
      dispatch(addToPastes(paste));
    }

    //after creation or  updation
    setTitle("");
    setValue("");
    setSearchParams({});
  }

  return (
    <div className="w-full px-4 lg:max-w-[1280px] mx-auto mt-2">
      <div className="flex flex-col  sm:flex-row justify-between gap-2 w-full">
        <input
          className="w-full sm:w-[70%] p-3 sm:p-2 border rounded-full m-1 sm:m-2 text-sm sm:text-base"
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          onClick={createPaste}
          className="w-full sm:w-[30%] bg-blue-600 hover:bg-blue-700 text-black py-3 sm:py-2 px-4 rounded-full text-sm sm:text-base transition-colors"
        >
          {pasteId ? "Update Paste" : "Create Paste"}
        </button>
      </div>

      <div className="mt-3 sm:mt-5">
        <textarea
          value={value}
          
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter your content here..."
          className="bg-gray-700 text-white w-full p-4 sm:p-5 rounded-xl min-h-[100vh] sm:min-h-[100vh] resize-none overflow-y-auto text-sm sm:text-base"
        />
      </div>
    </div>
  );
};

export default Home;
