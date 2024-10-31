"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth, UserButton } from "@clerk/nextjs";

function Dashboard() {
  const { isLoaded, userId } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !userId) {
      router.push("/sign-up");
    }
  }, [isLoaded, userId, router]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return <UserButton />;
}

export default Dashboard;
