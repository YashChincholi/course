import React from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

import Image from "next/image";

function LoadingDialog({ loading }) {
  return (
    <AlertDialog open={loading}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            <VisuallyHidden>Loading</VisuallyHidden>
          </AlertDialogTitle>
          <AlertDialogDescription>
            <div className="flex flex-col items-center justify-center p-2">
              <Image
                src={"/loader.gif"}
                alt={"loading"}
                width={100}
                height={100}
              />
              <h2 className="text-md font-semibold text-black">
                Please Wait.....AI Working on course
              </h2>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default LoadingDialog;
