import Image from "next/image";
import React from "react";

const MangaListCard = ({ title, author, description, src }) => {
  return (
    <div className="border p-2 mx-4 md:mx-10 lg:mx-16 flex gap-4 w-full rounded-sm">
      <Image
        height={80}
        width={80}
        alt="cover art"
        src={src}
        className="rounded-sm"
      />
      <div className="flex flex-col">
        <p>{title}</p>
        <p className="text-gray-500">{author}</p>
        <p className="text-sm text-gray-700 line-clamp-1 md:line-clamp-3 ">
          {description}
        </p>
      </div>
    </div>
  );
};

export default MangaListCard;
