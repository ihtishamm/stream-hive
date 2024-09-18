"use client"

import { CldVideoPlayer } from 'next-cloudinary';
import 'next-cloudinary/dist/cld-video-player.css';


export function VideoPlayer() {


  return (
    <CldVideoPlayer
      id='sea-turtle'
      width='50'
      height='50'
      src='samples/sea-turtle'
      aiHighlightsGraph={true}
      autoPlay={true}
      pictureInPictureToggle={true}
      autoShowRecommendations={true}
      showLogo={false}
      transformation={{
        streaming_profile: 'hd',
      }}
      sourceTypes={['hls']}
    />

  );
};


