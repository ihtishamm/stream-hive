import { useMutation } from 'urql';
import { UploadVideo } from '@/gqlClient/Video';
import { useState } from 'react';

const VideoUploadForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
    const [videoFile, setVideoFile] = useState<File | null>(null);
    const [publish, setPublish] = useState(false);

    const [, uploadVideo] = useMutation(UploadVideo);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Prepare the FormData object for file uploads
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        if (thumbnailFile) {
            formData.append('thumbnailFile', thumbnailFile);
        }
        if (videoFile) {
            formData.append('videoFile', videoFile);
        }
        formData.append('publish', String(publish));

        // Call the mutation with form data
        const variables = {
            input: formData,
        };

        const result = await uploadVideo(variables);

        if (result.error) {
            console.error('Error uploading video:', result.error);
        } else {
            console.log('Video uploaded successfully:', result.data);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                required
            />
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                required
            />
            <input
                type="file"
                accept="image/*"
                onChange={(e) => setThumbnailFile(e.target.files?.[0] || null)}
                required
            />
            <input
                type="file"
                accept="video/*"
                onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
                required
            />
            <label>
                Publish:
                <input
                    type="checkbox"
                    checked={publish}
                    onChange={(e) => setPublish(e.target.checked)}
                />
            </label>
            <button type="submit">Upload Video</button>
        </form>
    );
};

export default VideoUploadForm;
