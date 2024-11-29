"use client";

import React, { useEffect, useState } from "react";
import { db } from "../../../../configs/db";
import { CourseList } from "../../../../configs/schema";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import CourseBasicInfo from "./_components/CourseBasicInfo";
import CourseDetail from "./_components/CourseDetail";
import ChapterList from "./_components/ChapterList";
import { useLoading } from "@/app/_context/LoadingContext";
import Loader from "@/app/_components/Loader";
import { Button } from "@/components/ui/button";
import { GenerateChapterContent_AI } from "../../../../configs/AiModel";

function CourseLayout({ params }) {
  const { user, isLoaded } = useUser();
  const [courseId, setCourseId] = useState(null);
  const [course, setCourse] = useState([]);
  const { setIsLoading } = useLoading();

  useEffect(() => {
    async function fetchParams() {
      const unwrappedParams = await params;
      setCourseId(unwrappedParams.courseId);
    }

    if (isLoaded) {
      fetchParams();
    }
  }, [params, isLoaded]);

  useEffect(() => {
    if (courseId && user) {
      GetCourse();
    }
  }, [courseId, user]);

  const GetCourse = async () => {
    setIsLoading(true);
    const result = await db
      .select()
      .from(CourseList)
      .where(eq(CourseList?.courseId, courseId));

    setCourse(result[0]);
    setIsLoading(false);
  };

  console.log("Course:", course);

  const GenerateChapterContent = () => {
    setIsLoading(true);

    const chapters = course?.courseOutput?.chapters;
    chapters.forEach(async (chapter, index) => {
      console.log(index);
      const name = chapter.name || chapter.Name;
      const about = chapter.about || chapter.About;
      const PROMPT =
        "Explain the concept in detail on Topic: " +
        course?.name +
        ", Chapter: " +
        name +
        ", in JSON format with an list of array with following fields as title, explanation on given chapter in detail, Code example(Code Field in <precode> format) if applicable";

      // console.log(PROMPT);

      if (index == 0) {
        console.log(index);
        try {
          const result = await GenerateChapterContent_AI.sendMessage(PROMPT);
          console.log(result?.response?.text());
          setIsLoading(false);
        } catch (error) {
          setIsLoading(false);
          console.error(error);
        }
      }
    });
  };

  return (
    <div className="px-7 md:px-20 lg:px-44">
      <h2 className="text-2xl font-bold text-center">Course Layout</h2>

      {/* Basic info */}
      <CourseBasicInfo course={course} refreshData={() => GetCourse()} />

      {/* Course Details */}
      <CourseDetail course={course} />

      {/* List of lessons */}
      <ChapterList course={course} refreshData={() => GetCourse()} />

      <Button onClick={GenerateChapterContent} className="my-10">
        Generate Chapter Content
      </Button>
      <Loader />
    </div>
  );
}

export default CourseLayout;
