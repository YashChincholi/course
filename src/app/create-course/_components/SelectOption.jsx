import React, { useContext } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { UserInputContext } from "@/app/_context/UserInputContext";

function SelectOption() {
  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);

  const handelOptionChange = (fieldName, value) => {
    setUserCourseInput((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  return (
    <div className="px-10 md:px-20 lg:px-44 font-medium">
      <div className="grid grid-cols-2 gap-10">
        <div>
          <label className="text-sm">🎓Select Difficulty</label>
          <Select
            onValueChange={(value) => handelOptionChange("level", value)}
            defaultValue={userCourseInput?.level}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Begineer">Begineer</SelectItem>
              <SelectItem value="Intermediate">Intermediate</SelectItem>
              <SelectItem value="Advance">Advance</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm">🕓Course Duration</label>
          <Select
            onValueChange={(value) => handelOptionChange("duration", value)}
            defaultValue={userCourseInput?.duration}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1 Hours">1 Hours</SelectItem>
              <SelectItem value="2 Hours">2 Hours</SelectItem>
              <SelectItem value="More than 3 hours">
                More than 3 hours
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm">▶️Add Video</label>
          <Select
            onValueChange={(value) => handelOptionChange("displayVideo", value)}
            defaultValue={userCourseInput?.displayVideo}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Yes">Yes</SelectItem>
              <SelectItem value="No">No</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm">📖No of chapters</label>
          <Input
            type="number"
            className="h-14 text-lg"
            onChange={(e) => handelOptionChange("noOfChapter", e.target.value)}
            defaultValue={userCourseInput?.noOfChapter}
          />
        </div>
      </div>
    </div>
  );
}

export default SelectOption;
