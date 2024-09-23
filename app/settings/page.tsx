"use client";

import { useState } from 'react';

export default function Form() {
    const [thumbnail, setThumbnail] = useState<File | null>(null);
    const [video, setVideo] = useState<File | null>(null);  // Add state for video
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [publish, setPublish] = useState<boolean>(false);

    // Handle file input change
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            if (e.target.name === 'thumbnail') {
                setThumbnail(e.target.files[0]);  // Store selected thumbnail file in state
            } else if (e.target.name === 'video') {
                setVideo(e.target.files[0]);  // Store selected video file in state
            }
        }
    };

    // Upload files to the API
    const uploadFiles = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();  // Prevent default form submission behavior

        if (!thumbnail || !video) {
            alert("Please select both a thumbnail and a video to upload.");
            return;
        }

        const formData = new FormData();
        formData.append('thumbnail', thumbnail);  // Add the thumbnail to FormData
        formData.append('video', video);  // Add the video to FormData
        formData.append('title', title);
        formData.append('description', description);
        formData.append('publish', String(publish));

        try {
            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            if (!res.ok) {
                throw new Error("Failed to upload files");
            }

            const data = await res.json();
            console.log("Uploaded Thumbnail URL:", data.thumbnailUrl);
            console.log("Uploaded Video URL:", data.videoUrl);
            alert(`Files uploaded successfully! Thumbnail URL: ${data.thumbnailUrl}, Video URL: ${data.videoUrl}`);
        } catch (error) {
            console.error("Error uploading files:", error);
        }
    };

    return (
        <form onSubmit={uploadFiles}>
            <input
                type="file"
                name="thumbnail"
                accept="image/*"
                onChange={handleFileChange}  // Handle thumbnail input change
            />
            <input
                type="file"
                name="video"
                accept="video/*"
                onChange={handleFileChange}  // Handle video input change
            />
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <label>
                <input
                    type="checkbox"
                    checked={publish}
                    onChange={(e) => setPublish(e.target.checked)}
                />
                Publish

            </label>
            <br />
            <button type="submit">Upload</button>
        </form>
    );
}
