"use client";

import { CldVideoPlayer } from 'next-cloudinary';
import 'next-cloudinary/dist/cld-video-player.css';
import { Video } from '@/types';

export function VideoPlayer({ video, publicId }: { video: Video, publicId: string }) {
  return (
    <div className="w-full max-w-[900px] mx-auto">
      <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
        <CldVideoPlayer
          id={video?.id}
          src={publicId}
          className='w-full h-full'
          aiHighlightsGraph={true}
          autoPlay={true}
          pictureInPictureToggle={true}
          autoShowRecommendations={true}
          logo={false}
        />
      </div>
    </div>
  );
}
