import React, { useRef, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { PinData } from "../context/PinContext";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const inputRef = useRef(null);

  const handleClick = () => {
    inputRef.current.click();
  };

  const [file, setFile] = useState("");
  const [filePrev, setFilePrev] = useState("");
  const [title, setTitle] = useState("");
  const [pin, setPin] = useState("");
  const { addPin } = PinData();

  const changeFileHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setFilePrev(reader.result);
      setFile(file);
    };
  };

  const navigate = useNavigate();

  const addPinHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", title);
    formData.append("pin", pin);
    formData.append("file", file);

    addPin(formData, setFilePrev, setFile, setTitle, setPin, navigate);
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-200 flex flex-col items-center py-10">
      <div className="flex flex-wrap justify-center items-center gap-4">
        {/* Enhanced Image Upload Section */}
        <div className="flex items-center justify-center w-full max-w-sm p-6 bg-zinc-800 rounded-lg shadow-lg">
          <div className="flex flex-col items-center justify-center w-full">
            {filePrev ? (
              <div className="relative w-full h-64 mb-4 rounded-lg overflow-hidden">
                <img
                  src={filePrev}
                  alt="Preview"
                  className="object-cover w-full h-full"
                />
                <button
                  onClick={() => {
                    setFile("");
                    setFilePrev("");
                  }}
                  className="absolute top-2 right-2 bg-zinc-700 text-white p-1 rounded-full hover:bg-zinc-600"
                >
                  <FaPlus size={16} />
                </button>
              </div>
            ) : (
              <div
                className="flex flex-col items-center justify-center w-full h-64 bg-zinc-700 border border-zinc-600 rounded-lg cursor-pointer hover:bg-zinc-600"
                onClick={handleClick}
              >
                <input
                  ref={inputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={changeFileHandler}
                />
                <div className="w-16 h-16 flex items-center justify-center bg-zinc-600 rounded-full mb-4 text-zinc-400">
                  <FaPlus size={24} />
                </div>
                <p className="text-zinc-400">Choose a file</p>
              </div>
            )}
            <p className="mt-4 text-sm text-zinc-400">
              We recommend using high-quality .jpg files, but less than 10MB.
            </p>
          </div>
        </div>

        {/* Form Section */}
        <div className="w-full max-w-lg">
          <div className="bg-zinc-800 p-6 rounded-lg shadow-lg">
            <form onSubmit={addPinHandler}>
              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-zinc-200"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  className="w-full bg-zinc-700 border border-zinc-600 rounded-lg p-2 text-zinc-200"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="pin"
                  className="block text-sm font-medium text-zinc-200"
                >
                  Pin
                </label>
                <input
                  type="text"
                  id="pin"
                  className="w-full bg-zinc-700 border border-zinc-600 rounded-lg p-2 text-zinc-200"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700"
              >
                Add +
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
