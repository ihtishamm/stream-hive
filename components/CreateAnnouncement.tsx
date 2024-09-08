"use client";
import { useState } from "react";
import { Button } from "./ui/button";

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
        <div className="mb-6 p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-2">Create an Announcement</h2>
            <textarea
                className="w-full p-2 border border-gray-300 rounded-md mb-2"
                rows={3}
                placeholder="What's on your mind?"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
            />
            <Button

                onClick={handlePost}
                disabled={isPosting}
            >
                {isPosting ? 'Posting...' : 'Post'}
            </Button>
        </div>
    );
};

export default CreateAnnouncementForm;
