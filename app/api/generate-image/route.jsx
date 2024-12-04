import { storage } from "@/config/FirebaseConfig";
import axios from "axios";
import { getDownloadURL,ref, uploadString } from "firebase/storage";
import { NextResponse } from "next/server";
import Replicate from "replicate";

export async function POST(req) {
  try {
    const { prompt } = await req.json();
    console.log(prompt);
    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN,
    });

    console.log("Request body:", { prompt }); // Log incoming prompt data
    const input = {
      prompt: prompt,
      height: 1280,
      width: 1024,
      num_outputs: 1,
    };

    const output = await replicate.run("black-forest-labs/flux-dev-lora", {
      input,
    });
    console.log("Parsed output:", JSON.stringify(output, null, 2));

    // console.log("Replicate output:", output); // Log the response from Replicate
    //save image to firebase

    //   const base64Image = " data:image/png;base64,"+ await ConvertImage(input[0]);
    //  const fileName = 'ai-short-video-file/'+Date.now()+".png"
    //  const storageRef=ref(storage,fileName);

    //  await uploadString(storageRef.base64Image,'data_url');

    //  const downloadUrl= await getDownloadURL(storageRef);

    /**?chatgpt suggestion for above 5 line */
    console.log("hello");

    console.log(output[0]);
    console.log("hello");

    const base64Image =
      "data:image/png;base64," + (await ConvertImage(output[0]));
      console.log(base64Image)
    const fileName = "ai-short-video-file/" + Date.now() + ".png";
    const storageRef = ref(storage, fileName);

    await uploadString(storageRef, base64Image, "data_url");
    const downloadUrl = await getDownloadURL(storageRef);
    console.log(downloadUrl);
    // console.log(output);
    return NextResponse.json({ result: downloadUrl });

   
  } catch (e) {
    return NextResponse.json({ error: e });
  }
}

const ConvertImage = async (imageUrl) => {
  console.log(imageUrl);

  try {
    const resp = await axios.get(imageUrl, { responseType: "arraybuffer" });
    const base64Image = Buffer.from(resp.data).toString("base64");
    return base64Image;
  } catch (e) {
    console.log("Error:", e);
  }
};
