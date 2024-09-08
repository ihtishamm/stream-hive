// components/AnnouncementItem.tsx
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import getInitials from "@/Utils/getInitials";
import formatTime from "@/Utils/formatTimeAgoMomet";
import { ThumbsDown, ThumbsUp } from "lucide-react";

// Define the Announcement type for props
type AnnouncementProps = {
    announcement: {
        id: string;
        user: {
            name: string;
            handle: string;
            image: string;
        };
        createdAt: string;
        message: string;
        dislikeCount: number;
        likeCount: number;
    };
};

const AnnouncementItem = ({ announcement }: AnnouncementProps) => (
    <li className="py-6 bg-gray-100 rounded-lg shadow-md">
        <div className="flex gap-4">
            <Avatar>
                <AvatarImage src={announcement.user.image} alt="user profile pic" />
                <AvatarFallback>{getInitials(announcement.user.name)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
                <div className="flex items-center gap-2 text-sm">
                    <p className="font-semibold text-gray-900">{announcement.user.name}</p>
                    <p className="text-gray-400">{formatTime(parseInt(announcement.createdAt))}</p>
                </div>
                <p className="my-2 text-gray-700">{announcement.message}</p>
                <div className="flex gap-4 mt-2">
                    <div className="flex items-center gap-1 text-sm">
                        <button className="text-blue-600 hover:text-blue-800">
                            <ThumbsUp className="h-4 w-4" />
                        </button>
                        <span>{announcement.likeCount}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                        <button className="text-red-600 hover:text-red-800">
                            <ThumbsDown className="h-4 w-4" />
                        </button>
                        <span>{announcement.dislikeCount}</span>
                    </div>
                </div>
            </div>
        </div>
    </li>
);

export default AnnouncementItem;
