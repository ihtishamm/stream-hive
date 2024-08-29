
import { SearchVideoItem } from "@/components/SearchVideoItems"
import {  videos } from "@/dummy-data/Home"

export default function Results () {
  return (
    <div>
        {videos.map(video => (
                <SearchVideoItem key={video.id}  {...video}/>
              ))}
    </div>
  )
}
