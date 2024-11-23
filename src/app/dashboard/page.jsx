"use client";

import AddCourse from "./_components/AddCourse";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth, UserButton } from "@clerk/nextjs";
import Loader from "./_components/Loader";

function Dashboard() {
  const { isLoaded, userId } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !userId) {
      router.push("/sign-up");
    }
  }, [isLoaded, userId, router]);

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center">
        <Loader loading={!isLoaded} />
      </div>
    );
  }

  return (
    <div>
      <AddCourse />
    </div>
  );
}

export default Dashboard;
