
import {  videos } from "@/dummy-data/Home"
// import { PageHeader } from "@/components/Header"
// import { VideoGridItem } from "@/components/VideoGridItems"
import { Sidebar } from "@/components/Sidebar"
import { SidebarProvider } from "@/contexts/sidebarContext"

export default function Home() {
  return (
    <SidebarProvider>
      <div className="max-h-screen flex flex-col">
           <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Button</button>
        <div className="grid grid-cols-[auto,1fr] flex-grow-1 overflow-auto">
          <Sidebar />
          <div className="overflow-x-hidden px-8 pb-4">
            <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
              {videos.map(video => (
                <video key={video.id} src={video.videoUrl}/>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  )
}