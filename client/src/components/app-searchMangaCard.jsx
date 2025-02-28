import { Plus } from "lucide-react";
import Image from "next/image";
import React from "react";

const SearchCard = ({
  image,
  title,
  author,
  description,
  handleAdd,
  volumeNumber,
}) => {
  return (
    <div className="border relative h-auto w-max rounded-none group">
      <div className=" flex flex-col w-[191px]">
        <Image
          src={image}
          alt="cover"
          width={200}
          height={200}
          className="border "
        />
        <p className="font-medium text-gray-800 pl-2">
          {title} Volume {volumeNumber}
        </p>
        <p className="font-medium text-gray-500 pl-2">{author}</p>
      </div>
      <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col  p-2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <p className="font-medium">{title}</p>
        <p className="font-medium text-gray-300">{author}</p>
        <p className="text-sm font-medium line-clamp-6 text-ellipsis">
          {description}
        </p>

        <div className="relative mt-auto group/button">
          <button
            onClick={handleAdd}
            className="mt-2 bg-white text-black rounded-full p-2 hover:bg-gray-200 transition"
            aria-label="Add to collection"
          >
            <Plus />
          </button>

          {/* Tooltip (visible only when button is hovered) */}
          <div className="absolute bottom-full left-12 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover/button:opacity-100 transition-opacity duration-300 pointer-events-none">
            Add to collection
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchCard;
