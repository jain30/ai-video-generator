import React from "react";
import {
  AbsoluteFill,
  Audio,
  Img,
  interpolate,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

function RemotionVideo({
  script,
  imageList,
  audioFileUrl,
  captions,
  setDurationFrame,
}) {
  // console.log("Audio File URL:", audioFileUrl);

  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();
  const getDurationFrame = () => {
    setDurationFrame((captions[captions?.length - 1]?.end / 1000) * fps);
    return (captions[captions?.length - 1]?.end / 1000) * fps;
  };

  const getCurrentCaptions = () => {
    const currentTime = (frame / 30) * 1000; // convert frame number to m.s
    const currentCaption = captions.find(
      (word) => currentTime >= word.start && currentTime <= word.end
    );
    return currentCaption ? currentCaption?.text : "";
  };

  return (
    <AbsoluteFill style={{ backgroundColor: "black" }}>
      {imageList?.map((item, index) => {
        const startTime = (index * getDurationFrame()) / imageList?.length;
        const duration = getDurationFrame();

        const scale = (index) =>
          interpolate(
            frame,
            [startTime, startTime + duration / 2, startTime + duration], // Input range
            index % 2 == 0 ? [1, 1.8, 1] : [1.8, 1, 1.8], // Output range
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" } // Extrapolation options
          );

        return (
          <Sequence
            key={index}
            from={startTime}
            durationInFrames={getDurationFrame()}
          >
            <AbsoluteFill
              style={{ justifyContent: "center", alignItems: "center" }}
            >
              <Img
                src={item}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transform: `scale(${scale(index)})`,
                }}
              />

              <AbsoluteFill
                style={{
                  color: "white",
                  justifyContent: "center",
                  top: undefined,
                  bottom: 50,
                  height: 150,
                  textAlign: "center",
                  width: "100%",
                }}
              >
                <h2 className="text-2xl">{getCurrentCaptions()}</h2>
              </AbsoluteFill>
            </AbsoluteFill>
          </Sequence>
        );
      })}

      {/* <Audio src={audioFileUrl}/> */}

      {/* <Audio src={audioFileUrl} /> */}

      {/* Add Audio Safely */}
      {audioFileUrl && (
        <Sequence from={0}>
          <Audio src={audioFileUrl} />
        </Sequence>
      )}
    </AbsoluteFill>
  );
}

export default RemotionVideo;
