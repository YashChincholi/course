"use client";

import { useClerk } from "@clerk/nextjs";

const LogoutButton = () => {
  const { signOut } = useClerk();

  const handleLogout = () => {
    signOut();
  };
  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
