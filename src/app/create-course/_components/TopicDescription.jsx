import React, { useContext } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UserInputContext } from "@/app/_context/UserInputContext";

function TopicDescription() {
  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);

  const handelTopicChange = (fieldName, value) => {
    setUserCourseInput((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  return (
    <div className="mx-20 lg:mx-44">
      {/* Input Topic */}
      <div className="mt-5">
        <label className="font-medium">
          💡Write the topic for which you want to generate a course. (e.g.
          Python Course, Yoga , etc ):
        </label>
        <Input
          placeholder="Topic"
          onChange={(e) => {
            handelTopicChange("topic", e.target.value);
          }}
          defaultValue={userCourseInput?.topic}
        />
      </div>

      <div className="mt-5">
        <label className="font-medium">
          📝Tell me more about your course, What you want to include in your
          course.(optional)
        </label>
        <Textarea
          placeholder="About your course"
          onChange={(e) => {
            handelTopicChange("description", e.target.value);
          }}
          defaultValue={userCourseInput?.description}
        />
      </div>

      {/* Text area desc */}
    </div>
  );
}

export default TopicDescription;
