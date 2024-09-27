"use client";
import { SearchVideoItem } from "@/components/SearchVideoItems"
import { useSearchParams } from "next/navigation";
import { useQuery } from "urql";
import { searchVideo } from "@/gqlClient/Video";
import { searchVideosResponse } from "@/types";
import Spinner from "@/components/Spinner";

export default function Results() {
  const searchParams = useSearchParams();
  const query = searchParams?.get("query");
  const [{ data, fetching, error }] = useQuery<searchVideosResponse>({ query: searchVideo, variables: { query }, pause: !query });

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-red-500 text-lg">Error: {error.message}</div>
      </div>
    );
  }

  if (!query) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-gray-600 text-lg">Please enter a search term above to find videos.</div>
      </div>
    );
  }

  if (fetching) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner />
      </div>
    );
  }

  const video = data?.searchVideos;
  if (video?.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-gray-600 text-lg">No videos found for "<span className="font-bold">{query}</span>".</div>
      </div>
    );
  }

  return (
    <div>
      {video?.length === 0 && <p className=" align-middle">No videos found</p>}
      {video?.map(video => (
        <SearchVideoItem key={video.id}  {...video} />
      ))}
    </div>
  )
}
