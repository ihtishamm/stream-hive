import { videos } from "@/dummy-data/Home";
import { SearchVideoItem } from "@/components/SearchVideoItems";
import { PlaylistInfoCard } from "@/components/PlaylistInfoCard";
const playlist = {
  id: "1",
  title: "My First Playlist",
  description: "This is my first playlist",
  playlistThumbnail: `${videos[3].thumbnailUrl}`,
  videoCount: 10,
  createdAt: new Date()
}

   

export default function SinglePlaylist(){
    return(
        <div className="container mx-auto p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-1/3 lg:sticky-card  lg:min-h-screen">
            <PlaylistInfoCard playlist={playlist} />
          </div>
          <div className="lg:w-2/3">
                {videos.map(video => (
                    <SearchVideoItem key={video.id}  {...video}/>
                ))}
            </div>
        </div>
        </div>
    )
}