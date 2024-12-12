import React from "react";
import { HiOutlineClock } from "react-icons/hi2";

function ChapterListCard({ chapter, index }) {
  return (
    <div className="grid grid-cols-5 items-center p-4 border-b">
      <div>
        <h2 className="bg-primary p-1 text-center h-8 w-8 text-white font-medium rounded-full">
          {index + 1}
        </h2>
      </div>

      <div className="col-span-4">
        <h2 className="font-semibold">{chapter?.name}</h2>
        <h2 className="flex items-center gap-2 text-primary text-sm">
          <HiOutlineClock />
          {chapter?.duration}
        </h2>
      </div>
    </div>
  );
}

export default ChapterListCard;
