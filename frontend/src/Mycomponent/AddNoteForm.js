import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AddNoteForm({ setNoteMode, Fetchnotes, Currentnotes }) {
  const [task, setTask] = useState("");
  const [desc, setDesc] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (Currentnotes) {
      setTask(Currentnotes.task);
      setDesc(Currentnotes.desc);
    }
  }, [Currentnotes]);

  const onHandle = async (e) => {
    e.preventDefault();
    try {
      let response
      if (Currentnotes) {
        response = await axios.put(
          `http://localhost:5000/api/notes/${Currentnotes._id}`,
          { task, desc },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      } else {
        response = await axios.post(
          "http://localhost:5000/api/notes/add",
          { task, desc },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      }

      if (response.data.success) {
        setNoteMode(false);
        Fetchnotes();
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="fixed inset-0 flex items-center  justify-center absolute inset-0  bg-opacity-40 backdrop-blur ">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          {" "}
          {!Currentnotes ? "add Note" : "Update Note"}
        </h2>

        {/* Title */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Enter note title"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                           focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            rows="4"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Enter note description"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                           focus:outline-none focus:ring-2 focus:ring-indigo-500"
          ></textarea>
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-3">
          <button
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
            onClick={() => setNoteMode(false)}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            onClick={onHandle}
          >
            {!Currentnotes ? "Add Note" : "Update Note"}
          </button>
        </div>
      </div>
    </div>
    
  );
}
