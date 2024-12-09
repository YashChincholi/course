import Image from "next/image";
import React from "react";
import { HiOutlineBookOpen } from "react-icons/hi2";

function CourseCard({ course }) {
  console.log("course", course);
  console.log("course banner", course.banner);
  return (
    <div className="shadow-sm rounded-xl hover:scale-105 border transition-all p-2 ">
      {course?.banner ? (
        <Image
          src={course?.banner}
          width={300}
          height={300}
          alt="CourseBanner"
          className="w-full h-[200px] object-cover rounded-lg"
        />
      ) : (
        <Image
          src={"/placeholder.svg"}
          width={300}
          height={300}
          alt="placeholder"
          className="w-full h-[200px] object-cover rounded-lg"
        />
      )}
      <div className="p-2">
        <h2 className="font-medium">{course?.courseOutput?.courseName}</h2>
        <p className="text-gray-400 my-2">{course?.category}</p>
        <div className="flex items-center justify-between">
          <h2 className="flex gap-2 items-center p-1 bg-purple-50 text-primary text-sm font-medium rounded-sm">
            <HiOutlineBookOpen />
            {course?.noOfChapters} Chapters
          </h2>
          <h2 className="text-sm font-medium bg-purple-50 text-primary rounded-sm">
            {course?.level}
          </h2>
        </div>
      </div>
    </div>
  );
}

export default CourseCard;
