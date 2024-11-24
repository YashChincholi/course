"use client";
import { Button } from "@/components/ui/button";
import { useContext, useEffect, useState } from "react";
import SelectCategory from "./_components/SelectCategory.jsx";
import TopicDescription from "./_components/TopicDescription.jsx";
import SelectOption from "./_components/SelectOption.jsx";
import LoadingDialog from "./_components/LoadingDialog.jsx";
import {
  HiClipboardDocumentCheck,
  HiLightBulb,
  HiOutlineSquare3Stack3D,
} from "react-icons/hi2";
import { UserInputContext } from "../_context/UserInputContext.jsx";
import { GenerateCourseLayout_AI } from "../../../configs/AiModel.jsx";
import { db } from "../../../configs/db.jsx";
import { CourseList } from "../../../configs/schema.jsx";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/nextjs";

function CreateCourse() {
  const user = useUser();
  console.log(user);

  const stepper = [
    {
      id: 1,
      name: "Categroy",
      icon: <HiOutlineSquare3Stack3D />,
    },
    {
      id: 2,
      name: "Topic & Desc",
      icon: <HiLightBulb />,
    },
    {
      id: 3,
      name: "Options",
      icon: <HiClipboardDocumentCheck />,
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(userCourseInput);
  }, [userCourseInput]);

  /** use to check next button to disable or enable  */
  const checkStatus = () => {
    if (userCourseInput?.length == 0) {
      return true;
    }
    if (
      activeIndex == 0 &&
      (userCourseInput?.category?.length == 0 ||
        userCourseInput?.category == undefined)
    ) {
      return true;
    }
    if (
      activeIndex == 1 &&
      (userCourseInput?.topic?.length == 0 ||
        userCourseInput?.topic == undefined)
    ) {
      return true;
    } else if (
      activeIndex == 2 &&
      (userCourseInput?.level == undefined ||
        userCourseInput?.duration == undefined ||
        userCourseInput?.displayVideo == undefined ||
        userCourseInput?.noOfChapter == undefined)
    ) {
      return true;
    }
    return false;
  };
  const GenerateCourseLayout = async () => {
    setLoading(true);
    const BASIC_PROMPT =
      "Generate a course tutorial in JSON format with the following details Each chapter should include:- Name: Chapter name, Duration: Chapter duration,About: Chapter description. The AI should generate appropriate values for the course name, description, chapter names, durations, and descriptions.";

    const USER_Input_PROMPT =
      "Category: " +
      userCourseInput?.category +
      ",Topic: " +
      userCourseInput?.topic +
      ",Level: " +
      userCourseInput?.level +
      ",Duration: " +
      userCourseInput?.duration +
      ",Number of Chapters: " +
      userCourseInput?.noOfChapter +
      "";

    const FINAL_PROMPT = BASIC_PROMPT + USER_Input_PROMPT;
    try {
      const result = await GenerateCourseLayout_AI.sendMessage(FINAL_PROMPT);
      const parsedResult = JSON.parse(result.response?.text());
      console.log(parsedResult);
      saveDatabase(parsedResult);
    } catch (error) {
      console.error("Error generating course layout:", error);
    } finally {
      setLoading(false);
    }
  };

  const saveDatabase = async (courseOutput) => {
    var id = uuidv4();
    setLoading(true);
    const result = await db.insert(CourseList).values({
      courseId: id,
      name: userCourseInput?.topic,
      level: userCourseInput?.level,
      category: userCourseInput?.category,
      courseOutput: courseOutput,
      createdBy: user?.user.primaryEmailAddress?.emailAddress,
      userProfileImage: user?.user.imageUrl,
      userName: user?.user.fullName,
    });
    setLoading(false);
  };

  return (
    <div>
      {/* stepper */}
      <div className="flex flex-col justify-center items-center mt-10">
        <h2 className="text-primary text-4xl font-bold">Create Course</h2>
        <div className="flex my-10">
          {stepper.map((item, index) => (
            <div key={index} className="flex items-center justify-center">
              <div className="flex flex-col items-center w-[50px] md:w-[100px]">
                <div
                  className={`bg-gray-200 p-3 text-white rounded-full ${
                    activeIndex >= index && "bg-purple-500"
                  }`}
                >
                  {item.icon}
                </div>
                <h2 className="hidden md:block md:text-sm font-semibold">
                  {item.name}
                </h2>
              </div>
              {index !== stepper?.length - 1 && (
                <div
                  className={`h-1 w-[50px] md:w-[100px] lg:w-[170px] rounded-full bg-gray-300 ${
                    activeIndex - 1 >= index && "bg-purple-500"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Component */}

      <div className="px-10 md:px-20 lg:px-44 mt-10">
        {activeIndex == 0 ? (
          <SelectCategory />
        ) : activeIndex == 1 ? (
          <TopicDescription />
        ) : activeIndex == 2 ? (
          <SelectOption />
        ) : null}
        {/* Next Previous Button */}
        <div className="flex justify-between items-center mt-10">
          <Button
            disabled={activeIndex == 0}
            onClick={() => {
              setActiveIndex(activeIndex - 1);
            }}
          >
            Previous
          </Button>

          {activeIndex < 2 && (
            <Button
              onClick={() => {
                setActiveIndex(activeIndex + 1);
              }}
              disabled={checkStatus()}
            >
              Next
            </Button>
          )}

          {activeIndex == 2 && (
            <Button
              onClick={() => {
                GenerateCourseLayout();
              }}
              disabled={checkStatus()}
            >
              Generate Course Layout
            </Button>
          )}
        </div>
      </div>
      <LoadingDialog loading={loading} />
    </div>
  );
}

export default CreateCourse;
