"use client";

import React, { useContext, useEffect, useState } from "react";
import { db } from "../../../../configs/db";
import { CourseList } from "../../../../configs/schema";
import { eq } from "drizzle-orm";
import { useUser } from "@clerk/nextjs";
import CourseCard from "./CourseCard";
import UserCourseListContext from "@/app/_context/UserCourseListContext";

function UserCourseList() {
  const { user } = useUser();
  const [courseList, setCourseList] = useState([]);
  const { userCourseList, setUserCourseList } = useContext(
    UserCourseListContext
  );

  useEffect(() => {
    if (user) {
      getCourse();
    }
  }, [user]);

  const getCourse = async () => {
    const result = await db
      .select()
      .from(CourseList)
      .where(
        eq(CourseList?.createdBy, user?.primaryEmailAddress?.emailAddress)
      );
    setCourseList(result);
    setUserCourseList(result);
  };

  return (
    <div className="my-10">
      <h2 className="font-bold text-2xl mb-4">My Course List</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {courseList?.length > 0
          ? courseList?.map((course, index) => (
              <CourseCard
                course={course}
                key={index}
                refreshData={() => getCourse()}
              />
            ))
          : [1, 2, 3, 4, 5].map((item, index) => (
              <div
                key={index}
                className="bg-slate-200 mt-5 w-full h-[270px] animate-pulse rounded-lg"
              />
            ))}
      </div>
    </div>
  );
}

export default UserCourseList;
