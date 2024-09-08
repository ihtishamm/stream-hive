"use client";
import { userAnnoucements } from "@/gqlClient/Announcement";
import { useQuery } from "urql";
import getInitials from "@/Utils/getInitials";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import formatTime from "@/Utils/formatTimeAgoMomet";
import { ThumbsDown, ThumbsUp } from "lucide-react";

type Announcement = {
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

const CommunitySection = ({ userId }: { userId: string }) => {
  const [{ data, fetching, error }] = useQuery({
    query: userAnnoucements,
    variables: { userid: userId },
  });

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Error fetching announcements</p>;

  return (
    <div className="p-6">
      {data?.getUserAnnouncements?.length > 0 ? (
        <ul role="list" className="space-y-4">
          {data.getUserAnnouncements.map((announcement: Announcement) => (
            <li className="py-6 bg-gray-100 rounded-lg shadow-md" key={announcement.id}>
              <div className="flex gap-4">

                <Avatar>
                  <AvatarImage src={announcement.user.image} alt="user profile pic" />
                  <AvatarFallback>{getInitials(announcement.user.name)}</AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <div className="flex items-center gap-2 text-sm">
                    <p className="font-semibold text-gray-900">
                      {announcement.user.name}
                    </p>
                    <p className="text-gray-400">
                      {formatTime(parseInt(announcement.createdAt))}
                    </p>
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
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No announcements available.</p>
      )}
    </div>
  );
};

export default CommunitySection;
