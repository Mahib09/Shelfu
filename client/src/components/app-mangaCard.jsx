import Image from "next/image";
import React from "react";

const MangaCard = ({ src, title, author }) => {
  return (
    <div className="relative h-auto group rounded-md p-1 w-[180px] border">
      <Image
        height={270}
        width={180}
        src={src}
        alt="coverart"
        className="rounded-md h-auto w-auto object-cover"
        priority
      />
      <p className="line-clamp-1">{title}</p>
      <p>{author}</p>
    </div>
  );
};

export default MangaCard;
