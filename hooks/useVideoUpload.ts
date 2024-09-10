"use client"

import { useMutation } from 'urql';
import { UploadVideo } from '@/gqlClient/Video';
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

interface VideoDetails {
    title: string;
    description: string;
    thumbnail: File | null;
}

export function useVideoUpload(videoDetails: VideoDetails, selectedVideo: File | null, onClose: () => void) {
    const [result, uploadVideo] = useMutation(UploadVideo);
    const { fetching: isUploading } = result;
    const { toast } = useToast();
    const router = useRouter();

    console.log(videoDetails, selectedVideo);

    const handleUpload = async () => {
        if (!videoDetails.title || !videoDetails.description || !selectedVideo) {
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


        try {

            // await uploadVideo({
            //     input: {
            //         title,
            //         description,
            //         thumbnailFile: thumbnail,
            //         videoFile: selectedVideo
            //     }
            // });


            toast({
                title: "Video uploaded successfully!",
                description: "Your video has been uploaded.",
                variant: "default",
            });

            onClose();
            router.push("/");
        } catch (error) {
            toast({
                title: "Upload failed",
                description: "There was an issue uploading your video. Please try again.",
                variant: "destructive",
            });
        }
    }

    return { handleUpload, isUploading };
}
