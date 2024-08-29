"use client"
import { SearchVideoItem } from "@/components/SearchVideoItems";
import { VideoPlayer } from "@/components/VideoPlayer";
import CommentsSection from "@/components/CommentsSection";
import { videos } from "@/dummy-data/Home";

export default function WatchVideoPage({ params }: { params: { videoId: string } }) {
  const videoId = params.videoId;

  return (
    <div className="container mx-auto p-4 flex flex-col lg:flex-row gap-8">
      {/* Main Video Section */}
      <div className="flex-1">
        <VideoPlayer />

        {/* Video Details (Title, Likes, User Info, etc.) */}
        <div className="mt-4">
          <h1 className="text-2xl font-bold mb-2">Video Title</h1>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <img src="/path-to-profile-image" alt="User Name" className="w-10 h-10 rounded-full" />
              <div>
                <p className="font-semibold">User Name</p>
                <p className="text-gray-500 text-sm">Published Date</p>
              </div>
            </div>
            <div>
              <button className="bg-blue-500 text-white px-4 py-2 rounded">Like</button>
              <button className="bg-gray-200 px-4 py-2 rounded ml-2">Dislike</button>
            </div>
          </div>
          <p className="text-gray-700 mb-4">Video description and details...</p>
        </div>

        {/* Comments Section */}
        <CommentsSection videoId={videoId} />
      </div>

      {/* Recommended Videos Section */}
      <div className="lg:w-1/3">
        <div>
          <SearchVideoItem
            id="1"
            title="Recommended Video 1"
            channel={{ id: "1", name: "Channel Name", profileUrl: "/path-to-profile-image" }}
            views={1000}
            postedAt={new Date()}
            duration={120}
            thumbnailUrl={videos[0].thumbnailUrl}
            videoUrl={videos[0].videoUrl}
            
          />
          <SearchVideoItem
            id="1"
            title="Recommended Video 1"
            channel={{ id: "1", name: "Channel Name", profileUrl: "/path-to-profile-image" }}
            views={1000}
            postedAt={new Date()}
            duration={120}
            thumbnailUrl={videos[0].thumbnailUrl}
            videoUrl={videos[0].videoUrl}
          />
          <SearchVideoItem
            id="1"
            title="Recommended Video 1"
            channel={{ id: "1", name: "Channel Name", profileUrl: "/path-to-profile-image" }}
            views={1000}
            postedAt={new Date()}
            duration={120}
            thumbnailUrl={videos[0].thumbnailUrl}
            videoUrl={videos[0].videoUrl}
          />
          <SearchVideoItem
            id="1"
            title="Recommended Video 1"
            channel={{ id: "1", name: "Channel Name", profileUrl: "/path-to-profile-image" }}
            views={1000}
            postedAt={new Date()}
            duration={120}
            thumbnailUrl={videos[0].thumbnailUrl}
            videoUrl={videos[0].videoUrl}
          />
          <SearchVideoItem
            id="1"
            title="Recommended Video 1"
            channel={{ id: "1", name: "Channel Name", profileUrl: "/path-to-profile-image" }}
            views={1000}
            postedAt={new Date()}
            duration={120}
            thumbnailUrl={videos[0].thumbnailUrl}
            videoUrl={videos[0].videoUrl}
          />
          
        </div>
      </div>
    </div>
  );
}

  