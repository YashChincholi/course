import React from "react";
import { HiClock, HiOutlineCheckCircle } from "react-icons/hi";

function ChapterList({ course }) {
  console.log(course);
  return (
    <div className="mt-3">
      <h2 className="text-xl font-medium">Chapters</h2>
      <div className="mt-3">
        {course?.courseOutput?.chapters?.map((chapter, idx) => (
          <div
            className="border shadow-sm rounded-xl p-5 mb-2 flex justify-between items-center"
            key={idx}
          >
            <div className="flex gap-5 items-center">
              <h2 className="bg-primary text-white h-10 w-10 rounded-full text-center p-2 font-medium flex-none">
                {idx + 1}
              </h2>
              <div>
                <h2 className="font-semibold text-lg">{chapter?.name}</h2>
                <p className="text-gray-500 text-sm">{chapter?.about}</p>
                <p className="flex items-center gap-2 text-primary font-medium">
                  <HiClock /> {chapter?.duration}
                </p>
              </div>
            </div>
            <HiOutlineCheckCircle className="text-4xl text-gray-300 flex-none" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChapterList;