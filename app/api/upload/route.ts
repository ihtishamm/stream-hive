import { NextRequest, NextResponse } from 'next/server';
import { uploadToCloudinary } from '@/lib/uplaodToCloudinary';
import prisma from "@/lib/db";
import { getUserFromToken } from '@/lib/auth';  // Import your JWT token parser

export const POST = async (req: NextRequest) => {
    try {
        // Get the user from the JWT token in the Authorization header
        const token = req.headers.get('authorization') ?? '';
        const user = await getUserFromToken(token); // Use your existing method to extract user from token

        if (!user || !user.id) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const formData = await req.formData();
        const thumbnailFile = formData.get("thumbnail") as File;
        const videoFile = formData.get("video") as File;
        const title = formData.get("title")?.toString() ?? '';
        const description = formData.get("description")?.toString() ?? '';
        const publish = formData.get("publish") === 'true';

        if (!thumbnailFile || !videoFile) {
            return NextResponse.json({ message: "Missing files" }, { status: 400 });
        }

        // Convert files to base64 format
        const thumbnailBuffer = await thumbnailFile.arrayBuffer();
        const thumbnailBase64 = Buffer.from(thumbnailBuffer).toString("base64");
        const thumbnailUri = `data:${thumbnailFile.type};base64,${thumbnailBase64}`;

        const videoBuffer = await videoFile.arrayBuffer();
        const videoBase64 = Buffer.from(videoBuffer).toString("base64");
        const videoUri = `data:${videoFile.type};base64,${videoBase64}`;

        // Upload both files to Cloudinary
        const [thumbnailUploadResult, videoUploadResult] = await Promise.all([
            uploadToCloudinary(thumbnailUri, thumbnailFile.name),
            uploadToCloudinary(videoUri, videoFile.name)
        ]);

        // Check if both uploads were successful
        if (thumbnailUploadResult.success && videoUploadResult.success) {
            // Save video data to the database, including the user's ID from JWT
            const newVideo = await prisma.video.create({
                data: {
                    title,
                    description,
                    thumbnailUrl: thumbnailUploadResult.result?.secure_url,
                    videoUrl: videoUploadResult.result?.secure_url,
                    publish,
                    userId: user.id,  // Store the userId extracted from the token
                }
            });

            return NextResponse.json({
                message: "Video uploaded and saved successfully",
                video: newVideo,
            });
        } else {
            console.error("Cloudinary upload failed:", !thumbnailUploadResult.success ? thumbnailUploadResult : videoUploadResult);
            return NextResponse.json({ message: "Upload to Cloudinary failed" }, { status: 500 });
        }
    } catch (error) {
        console.error("Error processing upload:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
};
