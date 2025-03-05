import Image from "next/image";
import React from "react";
import { useSidebar } from "./ui/sidebar";
import { useUi } from "@/context/uiContext";

const MangaListCard = ({ title, author, description, src, volumeNumber }) => {
  const { open } = useSidebar();
  const { pagewidth } = useUi();
  console.log(pagewidth);
  return (
    <div
      className={`border p-2 mx-4 md:mx-10 lg:mx-16 flex gap-4 rounded-sm hover:scale-105 transition-all shadow-md ease-in-out delay-10 flex-grow`}
    >
      <Image
        height={80}
        width={80}
        alt="cover art"
        layout="intrinsic"
        src={src}
        className="rounded-sm w-[60px] md:w-[80px]"
      />
      <div className="flex flex-col">
        <p>
          {title} Vol {volumeNumber}
        </p>
        <p className="text-gray-500">{author}</p>
        <p className="text-sm text-gray-700 line-clamp-1 md:line-clamp-3">
          {description}
        </p>
      </div>
    </div>
  );
};

export default MangaListCard;
