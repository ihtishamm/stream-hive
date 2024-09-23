"use client"

import { CldVideoPlayer } from 'next-cloudinary';
import 'next-cloudinary/dist/cld-video-player.css';
import { Video } from '@/types';


export function VideoPlayer({ video, publicId }: { video: Video, publicId: string }) {


  return (
    <CldVideoPlayer
      id={video?.id}
      width='50'
      height='50'
      src={publicId}
      aiHighlightsGraph={true}
      autoPlay={true}
      pictureInPictureToggle={true}
      autoShowRecommendations={true}
      logo={false}
    />

  );
};


