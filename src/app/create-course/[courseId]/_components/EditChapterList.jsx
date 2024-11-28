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
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useLoading } from "@/app/_context/LoadingContext";
import Loader from "@/app/_components/Loader";
import { Button } from "@/components/ui/button";
import { db } from "../../../../../configs/db";
import { eq } from "drizzle-orm";
import { CourseList } from "../../../../../configs/schema";

function EditChapterList({ course, index, refreshData }) {
  // console.log("edit chapter list", course);

  const Chapters = course?.courseOutput?.chapters;

  const [name, setName] = useState();
  const [about, setAbout] = useState();
  const { setIsLoading } = useLoading();

  useEffect(() => {
    setName(Chapters[index]?.name || Chapters[index]?.Name);
    setAbout(Chapters[index]?.about || Chapters[index]?.About);
  }, [course]);

  const onUpdateHandler = async () => {
    setIsLoading(true);
    course.courseOutput.chapters[index].name = name;
    course.courseOutput.chapters[index].about = about;

    const result = await db
      .update(CourseList)
      .set({
        courseOutput: course?.courseOutput,
      })
      .where(eq(CourseList?.id, course?.id))
      .returning({ id: CourseList.id });

    console.log("edit chapter list result", result);
    refreshData(true);
    setIsLoading(false);
  };

  // console.log("chpater name", Chapters[index]?.name || Chapters[index]?.Name);
  // console.log("chpater about", Chapters[index]?.about || Chapters[index]?.About);

  return (
    <Dialog>
      <DialogTrigger>
        <HiPencilAlt />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Chapter Title & Description</DialogTitle>
          <DialogDescription>
            <div className="my-3">
              <label className="font-semibold">Chapter Title</label>
              <Input
                onChange={(event) => {
                  setName(event?.target?.value);
                }}
                defaultValue={Chapters[index]?.name || Chapters[index]?.Name}
              />
            </div>
            <div>
              <label className="font-semibold">Chapter Description</label>
              <Textarea
                onChange={(event) => {
                  setAbout(event?.target?.value);
                }}
                className="h-40"
                defaultValue={Chapters[index]?.about || Chapters[index]?.About}
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

export default EditChapterList;
