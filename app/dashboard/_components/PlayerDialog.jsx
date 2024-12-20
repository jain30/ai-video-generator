"use client";
import React, { useEffect, useState } from "react";
import { Player } from "@remotion/player";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import RemotionVideo from "./RemotionVideo";
import { Button } from "@/components/ui/button";
import { VideoData } from "@/config/schema";
import { db } from "@/config/db";
import { eq } from "drizzle-orm";
import { useRouter } from "next/navigation";

function PlayerDialog({ playVideo, videoId }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [videoData, setVideoData] = useState();
  const [durationInFrame, setDurationFrame] = useState(100);
  const router = useRouter();

  useEffect(() => {
    // setOpenDialog(!openDialog);
    console.log(videoId);
    videoId && GetVideoData();
  }, [playVideo]);

  const GetVideoData = async () => {
    const result = await db
      .select()
      .from(VideoData)
      .where(eq(VideoData.id, videoId));
    console.log(result);
    setVideoData(result[0]);
    setOpenDialog(!openDialog);
  };
  return (
    <Dialog open={openDialog}>
      <DialogContent className="bg-white flex flex-col items-center">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold my-5">
            Your video is ready
          </DialogTitle>
          <DialogDescription>
            <Player
              component={RemotionVideo}
              durationInFrames={Number(durationInFrame.toFixed(0))}
              compositionWidth={300}
              compositionHeight={450}
              fps={30}
              controls={true}
              inputProps={{
                ...videoData,
                setDurationFrame: (frameValue) => setDurationFrame(frameValue),
              }}
            />
            <div className="flex gap-10 mt-10">
              <Button
                variant="ghost"
                onClick={() => {
                  router.replace("/dashboard");
                  setOpenDialog(false);
                }}
              >
                Cancel
              </Button>
              <Button>Export</Button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default PlayerDialog;
