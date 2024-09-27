"use client"
import { SearchVideoItem } from "@/components/SearchVideoItems";
import { PlaylistInfoCard } from "@/components/PlaylistInfoCard";
import { usePathname } from "next/navigation";
import { useQuery } from "urql";
import { singlePlaylistResponse } from "@/types";
import { singleplaylist } from "@/gqlClient/Playlist";
import Spinner from "@/components/Spinner";

export default function SinglePlaylist() {
  const pathname = usePathname();
  const playlistId = pathname.split("/")[2];
  const [{ data, fetching, error }] = useQuery<singlePlaylistResponse>({
    query: singleplaylist,
    variables: { playlistId },
    pause: !playlistId,
  });

  const playlist = data?.getPlaylist;
  if (fetching) return <div className="mt-36"> <Spinner /> </div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!playlist) return <div>Playlist not found</div>;

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-1/3 lg:sticky  lg:min-h-screen">
          <PlaylistInfoCard playlist={playlist} />
        </div>
        <div className="lg:w-2/3">
          {playlist?.videos?.map(video => (
            <SearchVideoItem key={video.id}  {...video} />
          ))}
        </div>
      </div>
    </div>
  )
}