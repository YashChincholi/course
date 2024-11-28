import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { HiPencilAlt } from "react-icons/hi";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { db } from "../../../../../configs/db";
import { CourseList } from "../../../../../configs/schema";
import { eq } from "drizzle-orm";
import { useLoading } from "@/app/_context/LoadingContext";
import Loader from "@/app/_components/Loader";

function EditCourseBasicInfo({ course, refreshData }) {
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const { setIsLoading } = useLoading();

  useEffect(() => {
    setName(course?.courseOutput?.courseName);
    setDescription(course?.courseOutput?.description);
  }, [course]);

  const onUpdateHandler = async () => {
    setIsLoading(true);
    course.courseOutput.courseName = name;
    course.courseOutput.description = description;

    const result = await db
      .update(CourseList)
      .set({
        courseOutput: course?.courseOutput,
      })
      .where(eq(CourseList?.id, course?.id))
      .returning({ id: CourseList.id });

    console.log(result);
    refreshData(true);
    setIsLoading(false);
  };

  return (
    <Dialog>
      <DialogTrigger>
        <HiPencilAlt />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Course Title & Detail?</DialogTitle>
          <DialogDescription>
            <div className="my-3">
              <label className="font-semibold">Title</label>
              <Input
                onChange={(event) => {
                  setName(event?.target?.value);
                }}
                defaultValue={course?.courseOutput?.courseName}
              />
            </div>
            <div>
              <label className="font-semibold">Description</label>
              <Textarea
                onChange={(event) => {
                  setDescription(event?.target?.value);
                }}
                className="h-40"
                defaultValue={course?.courseOutput?.description}
              />
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>
            <Button onClick={onUpdateHandler}>Update</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
      <Loader />
    </Dialog>
  );
}

export default EditCourseBasicInfo;
