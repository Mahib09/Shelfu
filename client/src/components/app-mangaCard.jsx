import Image from "next/image";
import React from "react";

const MangaCard = ({ src, title, author, volumeNumber }) => {
  return (
    <div className="relative h-[308px] group rounded-md p-1 w-[180px]  border hover:scale-105 transition-all ease-in-out delay-100">
      <Image
        height={270}
        width={180}
        src={src}
        alt="coverart"
        className="rounded-md h-auto w-auto object-cover "
        priority
      />
      <p className="line-clamp-1">
        {title} Vol {volumeNumber}
      </p>
      <p>{author}</p>
    </div>
  );
};

export default MangaCard;
