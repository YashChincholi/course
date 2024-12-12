"use client";

import React, { useEffect, useState } from "react";
import { db } from "../../../../configs/db";
import { CourseList } from "../../../../configs/schema";
import CourseCard from "../_components/CourseCard";
import { Button } from "@/components/ui/button";

function Explore() {
  const [allCourseList, setAllCourseList] = useState();
  const [pageIndex, setPageIndex] = useState();

  useEffect(() => {
    GetAllCourses();
  }, [pageIndex]);

  const GetAllCourses = async () => {
    const result = await db
      .select()
      .from(CourseList)
      .limit(9)
      .offset(pageIndex * 9);
    console.log(result);
    setAllCourseList(result);
  };

  return (
    <div>
      <h2 className="font-semibold text-3xl">Explore More Projects</h2>
      <p>Explore more project build with ai by other users.</p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 my-4">
        {allCourseList?.map((course, index) => (
          <div key={index}>
            <CourseCard course={course} displayUser={true} />
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center mt-5">
        {pageIndex != 0 && (
          <Button onClick={() => setPageIndex(pageIndex - 1)}>
            Previous Page
          </Button>
        )}
        <Button onClick={() => setPageIndex(pageIndex + 1)}>Next Page</Button>
      </div>
    </div>
  );
}

export default Explore;
