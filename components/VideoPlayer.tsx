import React from "react";

import { videos } from "@/dummy-data/Home";

export function VideoPlayer() {
  return (
    <div className="relative w-full aspect-video">
      <video
        controls
        className="w-full h-full"
        src={videos[0].videoUrl}
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
};


