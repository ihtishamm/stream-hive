import { NextRequest, NextResponse } from 'next/server';
import { uploadToCloudinary } from '@/lib/uplaodToCloudinary';

export const POST = async (req: NextRequest) => {
    try {
        const formData = await req.formData();

        const thumbnailFile = formData.get("thumbnail") as File;
        const videoFile = formData.get("video") as File;
        const title = formData.get("title")?.toString() ?? '';
        const description = formData.get("description")?.toString() ?? '';
        const publish = formData.get("publish") === 'true';

        if (!thumbnailFile || !videoFile) {
            return NextResponse.json({ message: "Missing files" }, { status: 400 });
        }

        const thumbnailBuffer = await thumbnailFile.arrayBuffer();
        const thumbnailMimeType = thumbnailFile.type;
        const thumbnailBase64 = Buffer.from(thumbnailBuffer).toString("base64");
        const thumbnailUri = `data:${thumbnailMimeType};base64,${thumbnailBase64}`;

        const videoBuffer = await videoFile.arrayBuffer();
        const videoMimeType = videoFile.type;
        const videoBase64 = Buffer.from(videoBuffer).toString("base64");
        const videoUri = `data:${videoMimeType};base64,${videoBase64}`;

        const [thumbnailUploadResult, videoUploadResult] = await Promise.all([
            uploadToCloudinary(thumbnailUri, thumbnailFile.name),
            uploadToCloudinary(videoUri, videoFile.name)
        ]);

        if (thumbnailUploadResult.success && videoUploadResult.success) {
            // Save metadata along with URLs to your database
            // await saveToDatabase({ title, description, publish, thumbnailUrl: thumbnailUploadResult.result?.secure_url, videoUrl: videoUploadResult.result?.secure_url });

            return NextResponse.json({
                message: "success",
                thumbnailUrl: thumbnailUploadResult.result?.secure_url,
                videoUrl: videoUploadResult.result?.secure_url
            });
        } else {
            console.error("Cloudinary upload failed:", !thumbnailUploadResult.success ? thumbnailUploadResult : videoUploadResult);
            return NextResponse.json({ message: "Upload failed" }, { status: 500 });
        }
    } catch (error) {
        console.error("Error uploading to Cloudinary:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
};
