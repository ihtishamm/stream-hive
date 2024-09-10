import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

interface UploadVideoModalProps {
    open: boolean
    onClose: () => void
    onNext: () => void
    onVideoSelect: (file: File | null) => void
    selectedVideo: File | null
}

export function UploadVideoModal({ open, onClose, onNext, onVideoSelect, selectedVideo }: UploadVideoModalProps) {
    const { toast } = useToast()

    const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file && file.type.startsWith("video/")) {
            onVideoSelect(file)
        } else {
            toast({
                title: "Invalid file type",
                description: "Please upload a valid video file.",
                variant: "destructive",
            })
            onVideoSelect(null)
        }
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Upload Video</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <Label>Select a video file</Label>
                    <Input type="file" accept="video/*" onChange={handleVideoChange} />
                </div>
                <DialogFooter>
                    <Button variant="ghost" onClick={onClose}>Cancel</Button>
                    <Button onClick={onNext} disabled={!selectedVideo}>Next</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
