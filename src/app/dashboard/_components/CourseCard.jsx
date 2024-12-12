import Image from "next/image";
import React from "react";
import { HiOutlineBookOpen } from "react-icons/hi2";
import { HiEllipsisVertical } from "react-icons/hi2";
import DropdownOption from "./DropdownOption";
import { db } from "../../../../configs/db";
import { Chapters, CourseList } from "../../../../configs/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";

function CourseCard({ course, refreshData }) {
  console.log(course);
  const handelDelete = async () => {
    const courseResult = await db
      .delete(CourseList)
      .where(eq(CourseList?.id, course?.id))
      .returning({ id: CourseList?.id });

    const chapterResult = await db
      .delete(Chapters)
      .where(eq(Chapters?.courseId, course?.courseId))
      .returning({ id: Chapters?.id });

    if (courseResult && chapterResult) {
      refreshData(true);
    }
  };

  return (
    <div className="shadow-sm rounded-xl border p-2 ">
      <Link href={"course/" + course?.courseId}>
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
      </Link>
      <div className="p-2">
        <h2 className="font-medium flex items-start justify-between text-lg">
          {course?.courseOutput?.courseName}
          <span className="text-xl">
            <DropdownOption handelDelete={handelDelete}>
              <HiEllipsisVertical />
            </DropdownOption>
          </span>
        </h2>
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
