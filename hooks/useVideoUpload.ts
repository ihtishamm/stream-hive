"use client";

import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

interface VideoDetails {
    title: string;
    description: string;
    thumbnail: File | null;
}

export function useVideoUpload(videoDetails: VideoDetails, selectedVideo: File | null, onClose: () => void) {
    const [isUploading, setIsUploading] = useState(false);
    const { toast } = useToast();
    const router = useRouter();

    const { title, description, thumbnail } = videoDetails;

    const handleUpload = async () => {
        if (!title || !description || !selectedVideo || !thumbnail) {
            toast({
                title: "Missing required fields",
                description: "Please fill out all the fields before submitting.",
                variant: "destructive",
            });
            return;
        }

        toast({
            title: "Uploading...",
            description: "Your video is being uploaded. Please wait.",
        });

        setIsUploading(true);

        try {
            // Step 1: Create FormData with video, thumbnail, title, description, etc.
            const formData = new FormData();
            formData.append('thumbnail', thumbnail);
            formData.append('video', selectedVideo);
            formData.append('title', title);
            formData.append('description', description);
            formData.append('publish', 'true'); // Add additional fields as needed

            // Step 2: Send API request to upload files
            const response = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Failed to upload files");
            }

            const data = await response.json();

            toast({
                title: "Upload successful!",
                description: `Your video has been uploaded successfully`,
                variant: "default",
            });

            onClose();
            router.push("/");
        } catch (error) {
            console.error("Upload failed", error);
            toast({
                title: "Upload failed",
                description: "There was an issue uploading your video. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsUploading(false);
        }
    };

    return { handleUpload, isUploading };
}
