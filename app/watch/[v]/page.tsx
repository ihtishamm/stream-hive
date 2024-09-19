"use client"
import { SearchVideoItem } from "@/components/SearchVideoItems";
import { VideoPlayer } from "@/components/VideoPlayer";
import CommentsSection from "@/components/CommentsSection";
import { videos } from "@/dummy-data/Home";
import { VideoById } from "@/gqlClient/Video";
import { SingleVideoResponse } from "@/types";
import { useQuery } from "urql";


const extractPublicId = (url: string) => {
  const parts = url.split("/video/upload/");
  return parts[1] || "";
};

export default function WatchVideoPage({ params }: { params: { v: string } }) {
  const videoId = params.v;
  console.log(videoId);
  const [{ data, fetching, error }] = useQuery<SingleVideoResponse>({ query: VideoById, variables: { videoId } });



  { fetching && <div>Loading...</div> }
  { error && <div>Error: {error.message}</div> }
  const video = data?.getVideo;
  const publicId = video ? extractPublicId(video.videoUrl) : "";
  console.log(publicId);
  return (
    <div className="container mx-auto p-4 flex flex-col lg:flex-row gap-8">
      <div className="flex-1">
        {publicId ? (
          video && <VideoPlayer video={video} publicId={publicId} />
        ) : (
          <div>No video player available</div>
        )}
        <div className="mt-4">
          <h1 className="text-2xl font-bold mb-2">{video?.title}</h1>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <img src={video?.user.image ?? ""} alt="User Name" className="w-10 h-10 rounded-full" />
              <div>
                <p className="font-semibold">{video?.user.name ?? ''}</p>
                <p className="text-gray-500 text-sm">Published Date</p>
              </div>
            </div>
            <div>
              <button className="bg-blue-500 text-white px-4 py-2 rounded">Like</button>
              <button className="bg-gray-200 px-4 py-2 rounded ml-2">Dislike</button>
            </div>
          </div>
          <p className="text-gray-700 mb-4">{video?.description}</p>
        </div>

        <CommentsSection videoId={videoId} />
      </div>

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

