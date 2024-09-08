"use client";
import { useState } from "react";

type CreateAnnouncementFormProps = {
    onPost: (message: string) => void;
    isPosting: boolean;
};

const CreateAnnouncementForm = ({ onPost, isPosting }: CreateAnnouncementFormProps) => {
    const [newMessage, setNewMessage] = useState("");

    const handlePost = () => {
        if (newMessage.trim()) {
            onPost(newMessage);
            setNewMessage("");
        }
    };

    return (
        <div className="mb-6 p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-2">Create an Announcement</h2>
            <textarea
                className="w-full p-2 border border-gray-300 rounded-md"
                rows={3}
                placeholder="What's on your mind?"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
            />
            <button
                className="mt-2 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                onClick={handlePost}
                disabled={isPosting}
            >
                {isPosting ? 'Posting...' : 'Post'}
            </button>
        </div>
    );
};

export default CreateAnnouncementForm;
