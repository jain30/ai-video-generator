import { AssemblyAI } from "assemblyai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { audioFileUrl } = await req.json();

    const client = new AssemblyAI({
      apiKey: process.env.CAPTION_API_KEY,
    });

    const FILE_URL = audioFileUrl;

    const data = {
      audio: FILE_URL,
    };

    const transcript = await client.transcripts.transcribe(data);

    // Check the entire response
    console.log("Transcript response:", transcript);
    // console.log(transcript.words);
    return NextResponse.json({ result: transcript.words });
  } catch (e) {
    // return NextResponse.json({ error: e });

    //chatgpt suggestion

    console.error(e); // Log the actual error for debugging
    return NextResponse.json({
      error: "Failed to generate captions. Please try again.",
    });
  }
}
