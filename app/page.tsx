"use client"
import { PageHeader } from "@/components/Header"

import { Sidebar } from "@/components/Sidebar"
import { VideoSkeletonGrid } from "@/components/skeltions/videosSkelton"
import { VideoGridItem } from "@/components/VideoGridItems"
import { AllVideos } from "@/gqlClient/Video"
import { videoResponse } from "@/types"
import { useQuery } from "urql"
import { useRouter } from "next/navigation"
import { ErrorComponent } from "@/components/ErrorMessage"

export default function Home() {

  const router = useRouter()

  const [{ data, fetching, error }] = useQuery<videoResponse>({ query: AllVideos })

  const handleError = (): void => {
    router.refresh();
  }

  return (

    <div className="max-h-screen flex flex-col">
      <PageHeader />
      <div className="grid grid-cols-[auto,1fr] flex-grow-1 overflow-auto">

        <Sidebar />
        {fetching && <VideoSkeletonGrid />}
        {error && <ErrorComponent onRetry={handleError} />}
        <div className="overflow-x-hidden px-8 pb-4">
          <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
            {data?.getallVideos?.map(video => (
              <VideoGridItem key={video.id}  {...video} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}