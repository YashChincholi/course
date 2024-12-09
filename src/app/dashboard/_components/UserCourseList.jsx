"use client";

import React, { useEffect, useState } from "react";
import { db } from "../../../../configs/db";
import { CourseList } from "../../../../configs/schema";
import { eq } from "drizzle-orm";
import { useUser } from "@clerk/nextjs";
import CourseCard from "./CourseCard";

function UserCourseList() {
  const { user } = useUser();
  const [courseList, setCourseList] = useState([]);

  useEffect(() => {
    user && getCourse();
  }, [user]);

  const getCourse = async () => {
    const result = await db
      .select()
      .from(CourseList)
      .where(
        eq(CourseList?.createdBy, user?.primaryEmailAddress?.emailAddress)
      );
    setCourseList(result);
  };

  return (
    <div className="my-10">
      <h2 className="font-bold text-2xl mb-4">My Course List</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {courseList?.map((course, index) => (
          <CourseCard course={course} key={index} />
        ))}
      </div>
    </div>
  );
}

export default UserCourseList;
