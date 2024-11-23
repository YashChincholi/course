import React, { useContext } from "react";
import CategoryList from "@/app/_shared/CategoryList";
import Image from "next/image";
import { UserInputContext } from "@/app/_context/UserInputContext";

function SelectCategory() {
  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);
  const handelCategoryChange = (category) => {
    setUserCourseInput((prev) => ({
      ...prev,
      category: category,
    }));
  };
  return (
    <div className="px-10 md:px-20">
      <h2 className="mb-5 flex items-center justify-center font-semibold">
        Select the course category
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 ">
        {CategoryList.map((item, idx) => (
          <div
            key={idx}
            className={`flex flex-col p-5 border shadow-md items-center hover:border-primary hover:bg-blue-100 rounded-xl cursor-pointer ${
              userCourseInput?.category == item.name &&
              "border-primary bg-blue-50"
            } `}
            onClick={() => {
              handelCategoryChange(item.name);
            }}
          >
            <Image alt={item.name} src={item.icon} width={50} height={50} />
            <h2 className="font-medium">{item.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SelectCategory;
