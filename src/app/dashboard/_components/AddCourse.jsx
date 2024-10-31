import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import React from "react";

function AddCourse() {
  const { user } = useUser();
  return (
    <div className="flex justify-between items-center">
      <div>
        <h2 className="text-2xl">
          Hello <span className="font-bold">{user?.fullName}</span>
        </h2>
        <p className="text-sm text-gray-500">
          Create new course with AI, Share with friends and earn form it.
        </p>
      </div>
      <Button>+ Create AI Course</Button>
    </div>
  );
}

export default AddCourse;
