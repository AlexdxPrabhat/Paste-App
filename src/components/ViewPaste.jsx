import React, { use, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom';
import slice from '../Redux/pasteItSlice'

const ViewPaste = () => {
  const { id } = useParams();
  const allPaste = useSelector((state) => state.paste.pastes);
  
  const paste = allPaste.filter((p) => p._id === id)[0];
  console.log("final Paste", { paste })
  
  
  return (
    <div>
      <div className="min-w-2xl flex justify-between">
        <input
          className="w-[70%] p-2 border rounded-full m-2"
          type="text"
          placeholder="enter title"
          value={paste.title}
          disabled={true}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
      </div>
      <div className=" mt-5">
        <textarea
          disabled={true}
          value={paste.content}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          placeholder="Enter Here"
          rows={29}
          className="bg-gray-700 w-full p-5 rounded-xl h-full"
        ></textarea>
      </div>
    </div>
  );
}

export default ViewPaste
