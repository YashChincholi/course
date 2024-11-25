import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import { HiOutlinePuzzle } from "react-icons/hi";

function CourseBasicInfo({ course }) {
  console.log(course);
  return (
    <div className="border shadow-sm mt-5 p-10 rounded-xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <h2 className="font-bold text-3xl">
            {course?.courseOutput?.courseName}
          </h2>
          <p className="text-sm text-gray-400 mt-3">
            {course?.courseOutput?.description}
          </p>
          <h2 className="flex items-center font-bold text-primary mt-2 gap-2">
            <HiOutlinePuzzle />
            {course?.category}
          </h2>
          <Button className="w-full mt-5">Start</Button>
        </div>
        <div>
          <Image
            src={"/placeholder.svg"}
            width={300}
            height={300}
            className="object-cover w-full h-[250px] rounded-xl"
            alt={"placeholder"}
          />
        </div>
      </div>
    </div>
  );
}

export default CourseBasicInfo;
