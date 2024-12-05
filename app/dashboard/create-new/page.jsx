"use client";
import React, { useContext, useEffect, useState } from "react";
import SelectTopic from "./_components/SelectTopic";
import SelectStyle from "./_components/SelectStyle";
import SelectDuration from "./_components/SelectDuration";
import { Button } from "@/components/ui/button";
import axios from "axios";
import CustomLoading from "./_components/Custom_Loading";
import { v4 as uuidv4 } from "uuid";
import { VideoDataContext } from "@/app/_context/VideoDataContext";
import { create } from "axios";
import { useUser } from "@clerk/nextjs";
import { Users, VideoData } from "@/config/schema";
import { db } from "../../../config/db.js";
import PlayerDialog from "../_components/PlayerDialog";
import { UserDetailContext } from "@/app/_context/UserDetailContext";
// import { Users } from "lucide-react";
import { eq } from "drizzle-orm";
import { toast } from "sonner";
// const scriptData =
//   "Did you know that laughter is contagious? It can spread like wildfire through a crowd!Cleopatra lived closer in time to the invention of the iPhone than to the building of the Great Pyramid of Giza.A cat's purr is not only adorable but also a sign of contentment and can help heal bones!Pineapples are a collection of individual berries grown together. It is a multiple fruit.Hummingbirds' hearts can beat over 1,200 times per minute!Chameleons change color not only for camouflage but also to communicate their mood and temperature.Penguins can hold their breath for up to 20 minutes underwater.Yawning is contagious, just like laughter, and helps regulate our body temperature.Sunflowers always face the sun throughout the day, tracking its movement.Giant squids are real and can grow to enormous sizes, though they rarely get seen.";

// const videoSCRIPT = [];

// const FILEURL =
//   "https://firebasestorage.googleapis.com/v0/b/video-generator-using-ai.firebasestorage.app/o/ai-short-video-file%2Fd0253f0b-f552-4395-a96e-6713e212522c.mp3?alt=media&token=e598bf3e-893a-483b-89a9-f9bd03c06889";
function CreateNew() {
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [videoScript, setVideoScript] = useState();
  const [audioFileUrl, setAudioFileUrl] = useState();
  const [captions, setCaptions] = useState();
  const [imageList, setImageList] = useState();
  const [playVideo, setPlayVideo] = useState(true);
  const [videoId, setVideoId] = useState(63);
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const { videoData, setVideoData } = useContext(VideoDataContext);
  const { user } = useUser();
  const onHandleInputChange = (fieldName, fieldValue) => {
    console.log(fieldName, fieldValue);

    setFormData((prev) => ({
      ...prev,
      [fieldName]: fieldValue,
    }));
  };

  const onCreateClickHandler = () => {
    if (userDetail?.credits >= 0) {
      GetVideoScript();
    } else {
      // console.log(userDetail.credits);

      toast("You don't have enough Credits");
      return;
    }
  };

  //Get Video Script

  const GetVideoScript = async () => {
    setLoading(true);
    const prompt =
      "Write a script to generate" +
      formData.duration +
      " video on topic : " +
      formData.topic +
      " along with AI image prompt in " +
      formData.imageStyle +
      " format for each scene and give me result in JSON format with imagePrompt and ContentText as field, no plain text";
    // console.log(prompt);
    const resp = await axios.post("/api/get-video-script", {
      prompt: prompt,
    });

    if (resp.data.result) {
      setVideoData((prev) => ({
        ...prev,
        videoScript: resp.data.result,
      }));
      setVideoScript(resp.data.result);
      //call audio generate file here
      await GenerateAudioFile(resp.data.result);
    }

    setLoading(false);
  };

  //this file generate audio file and save in firebase
  const GenerateAudioFile = async (VideoScriptData) => {
    setLoading(true);
    let script = "";
    const id = uuidv4();
    VideoScriptData.forEach((item) => {
      script = script + item.ContentText + "";
    });

    const resp = await axios.post("/api/generate-audio", {
      text: script,
      id: id,
    });
    setVideoData((prev) => ({
      ...prev,
      audioFileUrl: resp.data.result,
    }));

    // setAudioFileUrl(resp.data.result);
    resp.data.result &&
      (await GenerateAudioCaption(resp.data.result, VideoScriptData));

    setLoading(false);
  };

  //used to generate caption
  const GenerateAudioCaption = async (fileUrl, VideoScriptData) => {
    setLoading(true);

    const resp = await axios.post("/api/generate-caption", {
      audioFileUrl: fileUrl,
    });

    setCaptions(resp?.data?.result);
    setVideoData((prev) => ({
      ...prev,
      captions: resp.data.result,
    }));
    resp.data.result && (await GenerateImage(VideoScriptData));

    // console.log(videoScript, captions, audioFileUrl);
  };

  //used to generate AI images
  const GenerateImage = async (VideoScriptData) => {
    console.log("generate image called", VideoScriptData);
    let images = [];
    for (const element of VideoScriptData) {
      try {
        const resp = await axios.post("/api/generate-image", {
          prompt: element.imagePrompt,
        });
        console.log("replicate response", resp);
        console.log(resp.data.result);
        images.push(resp.data.result);
        console.log(images);
      } catch (e) {
        console.log("Error:" + e);
      }
    }
    // console.log(images,videoScript,audioFileUrl,captions);
    setVideoData((prev) => ({
      ...prev,
      imageList: images,
    }));
    setImageList(images);
    setLoading(false);
  };

  useEffect(() => {
    console.log(videoData);
    if (videoData) {
      if (Object.keys(videoData).length == 4) {
        SaveVideoData(videoData);
      }
    }
  }, [videoData]);

  const SaveVideoData = async (videoData) => {
    setLoading(true);
    const result = await db
      .insert(VideoData)
      .values({
        script: videoData?.videoScript,
        audioFileUrl: videoData?.audioFileUrl,
        captions: videoData?.captions,
        imageList: videoData?.imageList,
        createdBy: user?.primaryEmailAddress?.emailAddress,
      })
      .returning({ id: VideoData });

    await UpdateUserCredits();
    setVideoId(result[0].id);
    // setPlayVideo(true);
    console.log(result);
    setLoading(false);
  };

  // used to update user credits
  const UpdateUserCredits = async () => {
    const result = await db
      .update(Users)
      .set({
        credits: userDetail?.credits - 10,
      })
      .where(eq(Users?.email, user?.primaryEmailAddress?.emailAddress));
    console.log(result);
    setUserDetail((prev) => ({ ...prev, credits: userDetail?.credits - 10 }));
    setVideoData({});
  };

  return (
    <div>
      <h2 className="font-bold text-4xl text-primary text-center">
        Create New
      </h2>

      <div className="mt-10 p-10 shadow-md">
        {/* select topic */}
        <SelectTopic onUserSelect={onHandleInputChange} />

        {/* select style */}
        <SelectStyle onUserSelect={onHandleInputChange} />

        {/* duration */}
        <SelectDuration onUserSelect={onHandleInputChange} />

        {/* create button */}
        <Button className="mt-10 w-full" onClick={onCreateClickHandler}>
          Create Short Video
        </Button>
      </div>
      <CustomLoading loading={loading} />
      <PlayerDialog playVideo={playVideo} videoId={videoId} />
    </div>
  );
}
export default CreateNew;
