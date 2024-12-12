"use client";

import React, { use, useEffect, useState } from "react";
import { db } from "../../../../configs/db";
import { eq } from "drizzle-orm";
import { CourseList } from "../../../../configs/schema";
import Header from "@/app/_components/Header";
import CourseBasicInfo from "@/app/create-course/[courseId]/_components/CourseBasicInfo";
import CourseDetail from "@/app/create-course/[courseId]/_components/CourseDetail";
import ChapterList from "@/app/create-course/[courseId]/_components/ChapterList";

function Course({ params }) {
  const unwrappedParams = use(params);
  const [course, setCourse] = useState();

  useEffect(() => {
    unwrappedParams && GetCourse();
  }, [unwrappedParams]);

  const GetCourse = async () => {
    const result = await db
      .select()
      .from(CourseList)
      .where(eq(CourseList?.courseId, unwrappedParams?.courseId));
    setCourse(result[0]);
    console.log(result);
  };
  return (
    <div>
      <Header />
      <div className="p-10 px-10 md:px-20 lg:px-44">
        <CourseBasicInfo course={course} edit={false} />

        <CourseDetail course={course} />

        <ChapterList course={course} edit={false} />
      </div>
    </div>
  );
}

export default Course;
