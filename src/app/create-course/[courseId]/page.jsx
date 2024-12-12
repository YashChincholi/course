"use client";

import React, { useEffect, useState } from "react";
import { db } from "../../../../configs/db";
import { Chapters, CourseList } from "../../../../configs/schema";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import CourseBasicInfo from "./_components/CourseBasicInfo";
import CourseDetail from "./_components/CourseDetail";
import ChapterList from "./_components/ChapterList";
import { useLoading } from "@/app/_context/LoadingContext";
import Loader from "@/app/_components/Loader";
import { Button } from "@/components/ui/button";
import { GenerateChapterContent_AI } from "../../../../configs/AiModel";
import service from "../../../../configs/service";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";

function CourseLayout({ params }) {
  const { user, isLoaded } = useUser();
  const [courseId, setCourseId] = useState(null);
  const [course, setCourse] = useState([]);
  const { setIsLoading } = useLoading();
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
    setIsLoading(true);
    const result = await db
      .select()
      .from(CourseList)
      .where(eq(CourseList.courseId, courseId));

    setCourse(result[0]);
    setIsLoading(false);
  };
  const GenerateChapterContent = async () => {
    setIsLoading(true);

    const chapters = course?.courseOutput?.chapters;
    if (!chapters) {
      console.error("No chapters found in course output.");
      setIsLoading(false);
      return;
    }

    for (const [index, chapter] of chapters.entries()) {
      const name = chapter.name || chapter.Name;
      const about = chapter.about || chapter.About;
      const PROMPT =
        "Explain the concept in detail on Topic: " +
        course?.name +
        ", Chapter: " +
        name +
        ", in JSON format with an list of array with following fields as title, explanation on given chapter in detail, Code example(Code Field in <precode> format) if applicable";

      try {
        let videoId = "";
        const id = uuidv4();

        // Generate video URL
        const resp = await service.getVideos(
          course?.name + ":" + chapter?.name
        );
        videoId = resp[0]?.id?.videoId;

        // Generate chapter content
        const result = await GenerateChapterContent_AI.sendMessage(PROMPT);
        const content = JSON.parse(result?.response?.text());

        // Save Chapter content + video URL
        await db.insert(Chapters).values({
          courseId: course?.courseId,
          chapterId: (index + 1).toString(), // Sequential chapterId
          content: content,
          videoId: videoId,
        });

        console.log(`Chapter ${index + 1} added successfully`);
      } catch (error) {
        console.error(`Failed to add chapter ${index + 1}`, error);
      }
    }

    // Update course publish status after all chapters are added
    await db
      .update(CourseList)
      .set({
        publish: true,
      })
      .where(eq(CourseList.courseId, course?.courseId));

    setIsLoading(false);
    router.replace("/create-course/" + course?.courseId + "/finish");
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
