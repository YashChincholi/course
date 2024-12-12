import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useState } from "react";
import { HiOutlinePuzzle } from "react-icons/hi";
import EditCourseBasicInfo from "./EditCourseBasicInfo";
import { CldImage } from "next-cloudinary";
import { CourseList } from "../../../../../configs/schema";
import { db } from "../../../../../configs/db";
import { eq } from "drizzle-orm";
import Link from "next/link";

function CourseBasicInfo({ course, refreshData, edit = true }) {
  const updatebannerInDatabase = async (courseId, banner) => {
    try {
      await db
        .update(CourseList)
        .set({ banner: banner })
        .where(eq(course?.id, courseId));
    } catch (error) {
      console.error("Failed to update image URL in database", error);
    }
  };

  const onFileSelected = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "course");

    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dvn3dqomw/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();
    const banner = data.secure_url;

    // Update the database with the new banner
    await updatebannerInDatabase(course.id, banner);

    refreshData(true);
  };

  return (
    <div className="border shadow-sm my-2 p-10 rounded-xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <h2 className="font-bold text-3xl">
            {course?.courseOutput?.courseName}
            <span className="text-primary ml-2">
              {edit && (
                <EditCourseBasicInfo
                  course={course}
                  refreshData={() => refreshData(true)}
                />
              )}
            </span>
          </h2>
          <p className="text-sm text-gray-400 mt-3">
            {course?.courseOutput?.description}
          </p>
          <h2 className="flex items-center font-bold text-primary mt-2 gap-2">
            <HiOutlinePuzzle />
            {course?.category}
          </h2>
          {!edit && (
            <Link href={"/course/" + course?.courseId + "/start"}>
              <Button className="w-full mt-5">Start</Button>
            </Link>
          )}
        </div>
        <div>
          <label htmlFor="upload-image">
            {course?.banner ? (
              <CldImage
                src={course?.banner}
                width={300}
                height={300}
                fit="cover"
                alt="Uploaded Image"
                className="object-contain w-full h-[250px] rounded-xl cursor-pointer"
              />
            ) : (
              <Image
                src="/placeholder.svg"
                width={300}
                height={300}
                className="object-cover w-full h-[250px] rounded-xl cursor-pointer"
                alt="placeholder"
              />
            )}
          </label>
          {edit && (
            <input
              type="file"
              id="upload-image"
              className="opacity-0"
              onChange={onFileSelected}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default CourseBasicInfo;
