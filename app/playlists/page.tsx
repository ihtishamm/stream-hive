import { PlaylistCardStack } from "@/components/PlaylistCardStack";
import { videos } from "@/dummy-data/Home";

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

export default function Allplaylists() {

    return (
        <div className="p-8">
          <h1 className="text-2xl font-bold mb-6">All Playlists</h1>
          <PlaylistCardStack items={dummyPlaylists} />
        </div>
      );
    }
   