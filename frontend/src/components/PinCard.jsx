import React from "react";
import { Link } from "react-router-dom";

const PinCard = ({ pin, index }) => {
  // Determine the height class based on the index to create the desi pattern
  const heightClass = index % 2 === 0 ? "h-48" : "h-96"; // Alternate between medium and tall heights

  return (
    <div className={`relative group cursor-pointer overflow-hidden rounded-xl bg-zinc-800 shadow-lg transform transition-transform duration-300 ease-in-out hover:scale-105 ${heightClass}`}>
      <img
        src={pin.image.url}
        alt={pin.description || "Pin Image"}
        className="w-full h-full object-cover"
        style={{ display: "block" }}
      />
      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-opacity duration-300 flex items-center justify-center">
        <Link
          to={`/pin/${pin._id}`}
          className="bg-[#9333ea] hover:bg-purple-800 text-white px-5 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          View Pin
        </Link>
      </div>
    </div>
  );
};

export default PinCard;
