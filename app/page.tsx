
import {  videos } from "@/dummy-data/Home"
import { PageHeader } from "@/components/Header"

import { Sidebar } from "@/components/Sidebar"
import { SidebarProvider } from "@/contexts/sidebarContext"
import { VideoGridItem } from "@/components/VideoGridItems"

export default function Home() {
  return (
    <SidebarProvider>
      <div className="max-h-screen flex flex-col">
<PageHeader/>
        <div className="grid grid-cols-[auto,1fr] flex-grow-1 overflow-auto">
          <Sidebar />
          <div className="overflow-x-hidden px-8 pb-4">
            <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
              {videos.map(video => (
                <VideoGridItem key={video.id}  {...video}/>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  )
}