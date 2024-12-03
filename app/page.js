import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <h1>welcome here</h1>
      <Button>click me</Button>
      <UserButton />
    </div>
  );
}
