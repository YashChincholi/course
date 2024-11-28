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

function CourseLayout({ params }) {
  const { user, isLoaded } = useUser();
  const [courseId, setCourseId] = useState(null);
  const [course, setCourse] = useState([]);
  const { isLoading, setIsLoading } = useLoading();

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
    console.log("Fetched Course:", result[0]);
    setIsLoading(false);
  };

  console.log("Course:", course);

  return (
    <div className="px-7 md:px-20 lg:px-44">
      <h2 className="text-2xl font-bold text-center">Course Layout</h2>

      {/* Basic info */}
      <CourseBasicInfo course={course} refreshData={() => GetCourse()} />

      {/* Course Details */}
      <CourseDetail course={course} />

      {/* List of lessons */}
      <ChapterList course={course} refreshData={() => GetCourse()} />
      <Loader />
    </div>
  );
}

export default CourseLayout;
