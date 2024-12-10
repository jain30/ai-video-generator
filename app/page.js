"use client";

import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation"; // Correct import for App Router
import Header from "./dashboard/_components/Header";

export default function Home() {
  const router = useRouter(); // Initialize router for navigation

  const handleNavigate = () => {
    router.push("/dashboard"); // Navigate to the dashboard
  };

  return (
    <div>
      {/* Header Component */}
      <Header />

      {/* Landing Page Content */}
      <div className="flex flex-col items-center justify-center min-h-screen text-center space-y-4">
        {/* Main Heading */}
        <h1 className="text-4xl font-bold">
          <span className="text-black">Build Your Short Video</span>
          <span className="text-primary"> With AI</span>
        </h1>

        {/* Subtext */}
        <p className="text-sm text-gray-500">
          Effortlessly create videos with cutting-edge AI technology.
        </p>

        {/* Button */}
        <Button onClick={handleNavigate}>Getting Started</Button>

        {/* User Button */}
        <UserButton />
      </div>
    </div>
  );
}
