"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { db } from "../../../../../configs/db";
import { eq } from "drizzle-orm";
import { CourseList } from "../../../../../configs/schema";
import { useUser } from "@clerk/nextjs";
import CourseBasicIinfo from "../_components/CourseBasicInfo";
import { HiOutlineClipboardDocumentCheck } from "react-icons/hi2";

function FinishScreen({ params }) {
  const { user, isLoaded } = useUser();
  const [courseId, setCourseId] = useState(null);
  const [course, setCourse] = useState([]);
  const router = useRouter();

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
    const result = await db
      .select()
      .from(CourseList)
      .where(eq(CourseList.courseId, courseId));

    setCourse(result[0]);
  };

  return (
    <div className="px-10 md:px-20 lg:px-44 my-7">
      <h2 className="text-primary text-center font-extrabold text-2xl my-3">
        Congrats! Your Course is Ready
      </h2>
      <CourseBasicIinfo
        course={course}
        refreshData={() => {
          console.log("first");
        }}
      />
      <h2>Course URL: </h2>
      <h2 className="text-center p-2 text-gray-500 border rounded-full flex gap-5 items-center">
        {process.env.NEXT_PUBLIC_HOST_NAME}/course/view/{course?.courseId}
        <HiOutlineClipboardDocumentCheck
          className="h-5 w-5 cursor-pointer"
          onClick={async () =>
            await navigator.clipboard.writeText(
              process.env.NEXT_PUBLIC_HOST_NAME +
                "/course/view/" +
                course?.courseId
            )
          }
        />
      </h2>
    </div>
  );
}

export default FinishScreen;
