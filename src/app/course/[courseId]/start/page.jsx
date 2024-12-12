"use client";

import React, { use, useEffect, useState } from "react";
import { db } from "../../../../../configs/db";
import { Chapters, CourseList } from "../../../../../configs/schema";
import { and, eq } from "drizzle-orm";
import ChapterListCard from "./_components/ChapterListCard";
import ChapterContent from "./_components/ChapterContent";
import Link from "next/link";
import { Button } from "@/components/ui/button";

function CourseStart({ params }) {
  const unwrappedParams = use(params);
  const [course, setCourse] = useState();
  const [chapterContent, setChapterContent] = useState();
  const [selectedChapter, setSelectedChapter] = useState();

  useEffect(() => {
    params && GetCourse();
  }, [params]);

  const GetCourse = async () => {
    const result = await db
      .select()
      .from(CourseList)
      .where(eq(CourseList?.courseId, unwrappedParams?.courseId));
    setCourse(result[0]);
    GetSelectedChapterContent(0);
  };

  const GetSelectedChapterContent = async (chapterId) => {
    console.log("course", course);
    console.log("course id", Chapters.courseId);
    const result = await db
      .select()
      .from(Chapters)
      .where(
        and(
          eq(Chapters?.chapterId, chapterId),
          eq(Chapters?.courseId, course?.courseId)
        )
      );
    setChapterContent(result[0]);
    // console.log("chapter content", result[0]);
  };

  return (
    <div className="overflow-auto">
      {/* Course Chapter list sidebar */}
      <div className="fixed md:w-64 md:block hidden h-screen border-r shadow-sm">
        <h2 className="font-semibold text-base p-5 bg-primary text-white">
          {course?.courseOutput?.courseName}
        </h2>
        <div>
          {course?.courseOutput?.chapters.map((chapter, index) => (
            <div
              key={index}
              className={`cursor-pointer hover:bg-purple-50 ${
                selectedChapter?.name === chapter?.name && "bg-purple-100"
              }`}
              onClick={() => {
                setSelectedChapter(chapter);
                GetSelectedChapterContent(index);
              }}
            >
              <ChapterListCard chapter={chapter} index={index} />
            </div>
          ))}
        </div>
        <div className="m-8">
          <Link href={"/dashboard"}>
            <Button>
              <span className="font-bold">Back to Dashboard</span>
            </Button>
          </Link>
        </div>
      </div>
      {/* Course content */}
      <div className="ml-64">
        <ChapterContent chapter={selectedChapter} content={chapterContent} />
      </div>
    </div>
  );
}

export default CourseStart;
