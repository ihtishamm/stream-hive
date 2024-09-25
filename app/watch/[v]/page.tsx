"use client";
import { SearchVideoItem } from "@/components/SearchVideoItems";
import { VideoPlayer } from "@/components/VideoPlayer";
import CommentsSection from "@/components/CommentsSection";
import { videos } from "@/dummy-data/Home";
import { VideoById } from "@/gqlClient/Video";
import { SingleVideoResponse } from "@/types";
import { useQuery } from "urql";
import { ThumbsDown, ThumbsUp, MoreVertical, UserRoundPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VideoTitle } from "@/components/skeltions/videoTitleSkelton";

const extractPublicId = (url: string) => {
  const parts = url.split("/video/upload/");
  return parts[1] || "";
};

export default function WatchVideoPage({ params }: { params: { v: string } }) {
  const videoId = params.v;
  console.log(videoId);
  const [{ data, fetching, error }] = useQuery<SingleVideoResponse>({ query: VideoById, variables: { videoId } });


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
          <div
            className="bg-black flex items-center justify-center"
            style={{
              width: "100%",
              height: "57%",
              maxHeight: "500px", // Optional max height to control size
            }}
          >

          </div>
        )}
        {fetching ? <VideoTitle /> :
          <div className="mt-4 lg:ml-4">
            <h1 className="text-2xl lg:text-3xl font-bold mb-2">{video?.title}</h1>
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-start mb-6">
              <div className="flex items-center gap-4 mb-4 lg:mb-0">
                <img
                  src={video?.user.image ?? ""}
                  alt={video?.user.name ?? "User Name"}
                  className="w-10 h-10 lg:w-12 lg:h-12 rounded-full"
                />
                <div>
                  <p className="font-semibold text-lg">{video?.user.name ?? ""}</p>
                  <p className="text-gray-500 text-sm mt-1">{video?.user?.followersCount} Followers</p>
                </div>

                <Button className="px-4 py-2 rounded-full font-bold ml-4 gap-2" variant="default">
                  <UserRoundPlus />Follow
                </Button>
              </div>

              <div className="flex items-start gap-4 ml-1 lg:ml-28">
                <button className="flex items-center gap-1 text-gray-700 hover:text-blue-500">
                  <ThumbsUp size={24} className="lg:w-7 lg:h-7" />
                  <span>{video?.likeCount}</span>
                </button>
                <button className="flex items-center gap-1 text-gray-700 hover:text-red-500">
                  <ThumbsDown size={24} className="lg:w-7 lg:h-7" />
                  <span>{video?.dislikeCount}</span>
                </button>
              </div>
            </div>
            <div className="text-sm text-gray-600 mb-4">
              {video?.viewsCount} views • {video?.createdAt ? new Date(video.createdAt).toLocaleDateString() : ""}
            </div>
            {/* Video Description */}
            <div className="border-t pt-4 pr-4">
              <p className="text-gray-700">{video?.description}</p>
            </div>
          </div>
        }

        <CommentsSection videoId={videoId} />
      </div>

      {/* Related Videos */}
      <div className="lg:w-1/3 lg:mt-[-20px]">
        <div>
          {videos.map((videoItem) => (
            <SearchVideoItem
              key={videoItem.id}
              id={videoItem.id}
              title={videoItem.title}
              channel={videoItem.channel}
              views={videoItem.views}
              postedAt={new Date(videoItem.postedAt)}
              duration={videoItem.duration}
              thumbnailUrl={videoItem.thumbnailUrl}
              videoUrl={videoItem.videoUrl}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
