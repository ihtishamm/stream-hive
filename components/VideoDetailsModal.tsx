import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useVideoUpload } from "@/hooks/useVideoUpload";
import { useToast } from "@/hooks/use-toast";

interface VideoDetailsModalProps {
    open: boolean;
    onClose: () => void;
    selectedVideo: File | null;
}

export function VideoDetailsModal({ open, onClose, selectedVideo }: VideoDetailsModalProps) {
    const [videoDetails, setVideoDetails] = useState<{
        title: string;
        description: string;
        thumbnail: File | null;
    }>({
        title: "",
        description: "",
        thumbnail: null,
    });
    const { toast } = useToast();
    const { handleUpload, isUploading } = useVideoUpload(videoDetails, selectedVideo, onClose);

    const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.type.startsWith("image/")) {
            setVideoDetails({ ...videoDetails, thumbnail: file });
        } else {
            toast({
                title: "Invalid file type",
                description: "Please select a valid image file for the thumbnail.",
                variant: "destructive",
            });
            setVideoDetails({ ...videoDetails, thumbnail: null });
        }
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="w-full sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%] max-w-full">
                <DialogHeader>
                    <DialogTitle>Add Video Details</DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="space-y-4">
                        <Label>Title</Label>
                        <Input
                            value={videoDetails.title}
                            onChange={(e) => setVideoDetails({ ...videoDetails, title: e.target.value })}
                        />
                        <Label>Description</Label>
                        <Textarea
                            value={videoDetails.description}
                            onChange={(e) => setVideoDetails({ ...videoDetails, description: e.target.value })}
                        />
                        <Label>Thumbnail</Label>
                        <Input
                            type="file"
                            accept="image/*"
                            onChange={handleThumbnailChange}
                        />
                    </div>
                    <div className="space-y-4">
                        <Label>Video Preview</Label>
                        {selectedVideo && (
                            <video
                                controls
                                src={URL.createObjectURL(selectedVideo)}
                                className="w-full h-48 lg:h-72 object-cover"
                            />
                        )}
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="ghost" onClick={onClose}>Cancel</Button>
                    <Button onClick={handleUpload} disabled={isUploading}>
                        {isUploading ? "Uploading..." : "Create Post"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
