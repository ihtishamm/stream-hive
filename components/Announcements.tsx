"use client";

const dummyAnnouncements = [
    {
      id: "1",
      user: {
        name: "John Doe",
        handle: "johndoe",
        image: "https://yt3.ggpht.com/ytc/APkrFKZWeMCsx4Q9e_Hm6nhOOUQ3fv96QGUXiMr1-pPP=s48-c-k-c0x00ffffff-no-rj",
      },
      createdAt: "2024-08-30T12:34:56Z",
      message: "This is the first announcement in the community!",
      likes: 10,
      dislikes: 2,
      viewer: {
        hasLiked: false,
        hasDisliked: false,
      },
    },
    {
      id: "2",
      user: {
        name: "Jane Smith",
        handle: "janesmith",
        image: "https://yt3.ggpht.com/ytc/APkrFKZWeMCsx4Q9e_Hm6nhOOUQ3fv96QGUXiMr1-pPP=s48-c-k-c0x00ffffff-no-rj",
      },
      createdAt: "2024-08-29T09:22:18Z",
      message: "Community updates coming soon! Stay tuned.",
      likes: 25,
      dislikes: 0,
      viewer: {
        hasLiked: true,
        hasDisliked: false,
      },
    },
  ];
  

import Image from "next/image";
import { useState } from "react";

const CommunitySection = () => {
  const [announcements] = useState(dummyAnnouncements);

  const handleLike = (id) => {
    console.log(`Liked post with ID: ${id}`);
    // Implement like logic here
  };

  const handleDislike = (id) => {
    console.log(`Disliked post with ID: ${id}`);
    // Implement dislike logic here
  };

  return (
    <div className="p-2 border-red-300">
      <ul role="list" className="divide-y divide-gray-200">
        {announcements.map((announcement) => (
          <li className="py-4" key={announcement.id}>
            <div className="flex gap-4">
              <Image
                src={announcement.user.image}
                alt={announcement.user.name}
                width={40}
                height={40}
                className="rounded-full"
              />
              <div className="flex w-full flex-col">
                <div className="flex items-center gap-2 text-xs">
                  <p className="text-sm font-semibold text-gray-900">
                    {announcement.user.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    @{announcement.user.handle}
                  </p>
                  <p className="text-sm text-gray-600">
                    {Date.now() - Number(announcement.createdAt)} days ago
                  </p>
                </div>
                <p className="my-2 text-sm text-gray-600">
                  {announcement.message}
                </p>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleLike(announcement.id)}
                    className={`${
                      announcement.viewer.hasLiked
                        ? "text-blue-500"
                        : "text-gray-500"
                    }`}
                  >
                    Like ({announcement.likes})
                  </button>
                  <button
                    onClick={() => handleDislike(announcement.id)}
                    className={`${
                      announcement.viewer.hasDisliked
                        ? "text-red-500"
                        : "text-gray-500"
                    }`}
                  >
                    Dislike ({announcement.dislikes})
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommunitySection;
