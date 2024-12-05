import { UserDetailContext } from "@/app/_context/UserDetailContext";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import React, { useContext } from "react";

export default function Header() {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  console.log("Context Value:", userDetail);

  return (
    <div className="p-3 px-3 flex items-center justify-between shadow-md">
      <div className="flex gap-3 items-center">
        <Image src={"/logo2.svg"} alt="logo" width={30} height={30} />
        <h2 className="font-bold text-xl">Ai Short Vid</h2>
      </div>
      <div className="flex gap-3 items-center">
        <div className="flex gap-1 items-center">
          <Image src={"/star.png"} alt="star" height={20} width={20} />
          <h2>{userDetail?.credits}</h2>
        </div>
        <Button>Dashboard</Button>
        <UserButton />
      </div>
    </div>
  );
}
