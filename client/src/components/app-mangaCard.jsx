import Image from "next/image";
import React from "react";

const MangaCard = ({ src, title, author, vol, status }) => {
  return (
    <div className="relative h-auto group rounded-md p-1 w-max">
      <Image
        height={300}
        width={200}
        src={src}
        alt="coverart"
        className="rounded-md h-[300px] object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <p className="text-lg font-bold">{title}</p>
        <p>{`Volume ${vol}`}</p>
        <p>{author}</p>
      </div>
      <div className="absolute inset-0 p-1 bg-yellow-300 w-max h-max rounded-lg text-gray-700">
        {status}
      </div>
    </div>
  );
};

export default MangaCard;
