"use client";
import Image from "next/image";
import { videos } from "@/dummy-data/Home";
import { subscriptions } from "@/dummy-data/Sidebar";
import { useState } from "react";
import FollowersList from "@/components/follwerList";
import { VideoGridItem } from "@/components/VideoGridItems";
import { PlaylistCardStack } from "@/components/PlaylistCardStack"
import CommunitySection from "@/components/Announcements";
import { usePathname } from "next/navigation";
import { useQuery } from "urql";
import { getUserById } from "@/gqlClient/user";
import { User, userResponse } from "@/types";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import getInitials from "@/Utils/getInitials";
import { UserRoundPlus } from "lucide-react";
const dummyPlaylists = [
  {
    id: 1,
    thumbnailUrl: `${videos[3].thumbnailUrl}`,
    videoCount: 10,
    playlistName: "My First Playlist",
    channelName: "Channel One",
  },
  {
    id: 2,
    thumbnailUrl: `${videos[4].thumbnailUrl}`,
    videoCount: 20,
    playlistName: "My Second Playlist",
    channelName: "Channel Two",
  },
  {
    id: 2,
    thumbnailUrl: `${videos[4].thumbnailUrl}`,
    videoCount: 20,
    playlistName: "My Second Playlist",
    channelName: "Channel Two",
  },
  {
    id: 2,
    thumbnailUrl: `${videos[4].thumbnailUrl}`,
    videoCount: 20,
    playlistName: "My Second Playlist",
    channelName: "Channel Two",
  },
];

export default function UserChannel() {
  const [activeTab, setActiveTab] = useState("videos");
  const pathname = usePathname();
  const userId = pathname.split("/")[2];
  console.log(userId);

  const [{ data, fetching, error }] = useQuery<userResponse>({
    query: getUserById,
    variables: { userId },
  });



  const Immage = `https://yt3.googleusercontent.com/NbeXiY_cA3_-6tujF7Ucf8QSxAy2z5x-My8UYiwyCW9truF3Yc0myEZQlTJeI8sSkc-xYX9KMQ=w1707-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj`;

  const renderContent = () => {
    switch (activeTab) {
      case "videos":
        return (
          <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
            {videos.map(video => (
              <VideoGridItem key={video.id}  {...video} />
            ))}
          </div>
        )
      case "followers":
        return <FollowersList />;
      case "playlists":
        return (
          <div className="p-2">
            <PlaylistCardStack items={dummyPlaylists} />
          </div>
        )
      case "community":
        return (
          <CommunitySection userId={userId} />
        )
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen w-full">
      <div className="gap-4">
        <div className="px-2 md:px-8 py-2 w-full rounded-lg">

          {
            data?.getUserById.backgroundImage && (
              <Image
                src={data?.getUserById.backgroundImage}
                width={1707}
                height={300}
                objectFit="cover"
                className="rounded-lg"
                alt="Channel Banner"
              />
            )
          }

        </div>

        <div className="flex flex-col md:flex-row p-8 gap-6">
          <div className="flex-shrink-0">

            <Avatar className="w-[176px] h-[176px]">
              <AvatarImage src={data?.getUserById.image ?? ''} alt="user profile pic" />
              <AvatarFallback className="text-2xl font-bold">{getInitials(data?.getUserById.name ?? '')}</AvatarFallback>
            </Avatar>
          </div>

          <div>
            <h1 className="text-2xl font-bold">{data?.getUserById.name}</h1>
            <div className="flex flex-col lg:flex-row lg:items-center gap-1 lg:gap-2 mt-2">
              <span className="text-sm text-gray-600">@{data?.getUserById.handle ?? "tesingdsa"}</span>
              <span className="hidden lg:inline-block">•</span>
              <span className="text-sm text-gray-600">{data?.getUserById.videosCount} videos</span>
            </div>
            <span className="text-sm text-gray-600">{data?.getUserById.followersCount} Followers</span> • <span className="text-sm text-gray-600">{data?.getUserById.followingCount} Following</span>
            <p className="mt-4 text-gray-700">
              {data?.getUserById.description}
            </p>

            <Button className="mt-4 flex items-center gap-2 px-4" variant="default"><UserRoundPlus />Follow</Button>
          </div>
        </div>
      </div>

      <div className="p-8">
        <div className="text-start text-gray-500 flex gap-6">
          <h2
            onClick={() => setActiveTab("videos")}
            className={`cursor-pointer hover:text-black ${activeTab === "videos" ? "text-black font-bold border-b-2 border-black" : ""
              }`}
          >
            Videos
          </h2>
          <h2
            onClick={() => setActiveTab("followers")}
            className={`cursor-pointer hover:text-black ${activeTab === "followers" ? "text-black font-bold border-b-2 border-black" : ""
              }`}
          >
            Followers
          </h2>
          <h2
            onClick={() => setActiveTab("playlists")}
            className={`cursor-pointer hover:text-black ${activeTab === "playlists" ? "text-black font-bold border-b-2 border-black" : ""
              }`}
          >
            Playlists
          </h2>
          <h2
            onClick={() => setActiveTab("community")}
            className={`cursor-pointer hover:text-black ${activeTab === "community" ? "text-black font-bold border-b-2 border-black" : ""
              }`}
          >
            Community
          </h2>
        </div>
        <div className="mt-4">{renderContent()}</div>
      </div>
    </div>
  );
}
