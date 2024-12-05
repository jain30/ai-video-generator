import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Image from "next/image";

function CustomLoading({ loading }) {
  return (
    <AlertDialog open={loading}>
      <AlertDialogContent className="bg-white flex flex-col items-center my-10 justify-center">
        <Image src={'/progress.gif'} alt="" width={100} height={100}/>
        <div className="bg-white">Generating Your video...Do not Refresh</div>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default CustomLoading;
