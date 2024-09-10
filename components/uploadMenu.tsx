import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Upload, Video, FileText } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { UploadVideoModal } from "./UploadVideoModel"
import { VideoDetailsModal } from "./VideoDetailsModal"

export function UploadMenu() {
    const [showUploadModal, setShowUploadModal] = useState(false)
    const [showDetailsModal, setShowDetailsModal] = useState(false)
    const [selectedVideo, setSelectedVideo] = useState<File | null>(null)

    const router = useRouter()

    const handleCreatePost = () => {
        router.push("/create-post")
    }

    const handleUploadVideo = () => {
        setShowUploadModal(true)
    }

    const handleNext = () => {
        if (selectedVideo) {
            setShowUploadModal(false)
            setShowDetailsModal(true)
        }
    }

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button size="icon" variant="ghost" className="rounded-full">
                        <Upload className="h-5 w-5" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48 mr-4">
                    <DropdownMenuItem
                        onSelect={handleCreatePost}
                        className="flex items-center space-x-3 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                        <FileText className="h-5 w-5 text-gray-700" />
                        <span>Create Post</span>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem
                        onSelect={handleUploadVideo}
                        className="flex items-center space-x-3 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                        <Video className="h-5 w-5 text-gray-700" />
                        <span>Upload Video</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <UploadVideoModal
                open={showUploadModal}
                onClose={() => setShowUploadModal(false)}
                onNext={handleNext}
                onVideoSelect={setSelectedVideo}
                selectedVideo={selectedVideo}
            />

            <VideoDetailsModal
                open={showDetailsModal}
                onClose={() => setShowDetailsModal(false)}
                selectedVideo={selectedVideo}
            />
        </>
    )
}
