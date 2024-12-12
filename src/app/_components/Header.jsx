import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function Header() {
  return (
    <div className="flex justify-between p-5 shadow-sm">
      <Link href={"/"}>
        <Image src={"/logo2.svg"} alt="logo" width={180} height={100} />
      </Link>
      <Link href={"/dashboard"}>
        <Button><span className="font-bold">Get Started</span></Button>
      </Link>
    </div>
  );
}

export default Header;
