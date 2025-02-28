import Image from "next/image";
import React from "react";

const MangaListCard = ({ title, author, description, src, volumeNumber }) => {
  return (
    <div className="border p-2 mx-4 md:mx-10 lg:mx-16 flex gap-4 w-full rounded-sm">
      <Image
        height={80}
        width={80}
        alt="cover art"
        src={src}
        className="rounded-sm w-[60px] md:w-[80px]"
      />
      <div className="flex flex-col">
        <p>
          {title} Vol {volumeNumber}
        </p>
        <p className="text-gray-500">{author}</p>
        <p className="text-sm text-gray-700 line-clamp-1 md:line-clamp-3 ">
          {description}
        </p>
      </div>
    </div>
  );
};

export default MangaListCard;
