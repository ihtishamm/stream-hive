import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import getInitials from "@/Utils/getInitials";
import formatTime from "@/Utils/formatTimeAgoMomet";
import { ThumbsDown, ThumbsUp, MoreVertical } from "lucide-react";
import { useState } from "react";
import { useMutation } from "urql";
import { editAnnouncement, deleteAnnouncement, likeAnnouncement, dislikeAnnouncement } from "@/gqlClient/Announcement";
import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuContent } from "./ui/dropdown-menu";
import { Button } from "./ui/button";

type AnnouncementProps = {
    announcement: {
        id: string;
        user: {
            name: string;
            handle: string;
            image: string;
            id: string;
        };
        createdAt: string;
        message: string;
        dislikeCount: number;
        likeCount: number;
        hasDisliked: boolean;
        hasLiked: boolean;
    };
    currentUserId: string;
    onEdit: () => void;
    onDelete: () => void;
};

const AnnouncementItem = ({ announcement, currentUserId, onEdit, onDelete }: AnnouncementProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newMessage, setNewMessage] = useState(announcement.message);

    const [, deleteAnnouncementMutation] = useMutation(deleteAnnouncement);
    const [editResult, editAnnouncementMutation] = useMutation(editAnnouncement);
    const [likeResult, likeAnnouncementMutation] = useMutation(likeAnnouncement);
    const [dislikeResult, dislikeAnnouncementMutation] = useMutation(dislikeAnnouncement);

    const handleDelete = async () => {
        await deleteAnnouncementMutation({ deleteAnnouncementId: announcement.id });
        onDelete();
    };

    const handleSave = async () => {
        if (newMessage.trim()) {
            await editAnnouncementMutation({
                input: { id: announcement.id, message: newMessage }
            });
            setIsEditing(false);
            onEdit();
        }
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setNewMessage(announcement.message);
    };

    const handleLike = async () => {
        try {
            const result = await likeAnnouncementMutation({
                input: { announcementId: announcement.id }
            });
            console.log(result);
            onEdit();
        } catch (error) {
            console.error("Error liking announcement:", error);
        }
    };

    const handleDislike = async () => {
        try {
            const result = await dislikeAnnouncementMutation({
                input: { announcementId: announcement.id }
            });
            console.log(result);
            onEdit();
        } catch (error) {
            console.error("Error disliking announcement:", error);
        }
    };

    return (
        <li className="py-6 bg-gray-100 rounded-lg shadow-md">
            <div className="flex justify-between">
                {isEditing ? (
                    <div className="flex flex-col w-full px-6">
                        <textarea
                            className="w-full p-2 border border-gray-300 rounded-md"
                            rows={2}
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                        />
                        <div className="flex justify-end gap-2 mt-2">
                            <Button variant="outline" onClick={handleCancelEdit}>
                                Cancel
                            </Button>
                            <Button onClick={handleSave} disabled={editResult.fetching}>
                                {editResult.fetching ? 'Saving...' : 'Save'}
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div className="flex gap-4 w-full">
                        <Avatar>
                            <AvatarImage src={announcement.user.image} alt="user profile pic" />
                            <AvatarFallback>{getInitials(announcement.user.name)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                            <div className="flex justify-between items-center">
                                <div className="flex gap-3">
                                    <p className="font-semibold text-gray-900">{announcement.user.name}</p>
                                    <p className="text-gray-400 text-sm">{formatTime(parseInt(announcement.createdAt))}</p>
                                </div>
                            </div>
                            <p className="my-2 text-gray-700">{announcement.message}</p>
                            <div className="flex gap-4 mt-2">
                                <div className="flex items-center gap-1 text-sm">
                                    <Button
                                        size="icon"
                                        variant="ghost"
                                        onClick={handleLike}
                                        disabled={likeResult.fetching}

                                    >
                                        {announcement.hasLiked ? <ThumbsUp size={24} color="blue" /> : <ThumbsUp size={24} color="gray" />}

                                    </Button>
                                    <span>{announcement.likeCount}</span>
                                </div>
                                <div className="flex items-center gap-1 text-sm">
                                    <Button
                                        size="icon"
                                        variant="ghost"
                                        onClick={handleDislike}
                                        disabled={dislikeResult.fetching}

                                    >
                                        {announcement.hasDisliked ? <ThumbsDown size={24} color="red" /> : <ThumbsDown size={24} color="gray" />}
                                    </Button>
                                    <span>{announcement.dislikeCount}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {currentUserId === announcement.user.id && !isEditing && (
                    <div className="relative">
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <button className="mr-4">
                                    <MoreVertical className="h-5 w-5" />
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem onClick={handleEditClick}>
                                    Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600" onClick={handleDelete}>
                                    Delete
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                )}
            </div>
        </li>
    );
};

export default AnnouncementItem;
