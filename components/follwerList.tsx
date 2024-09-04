"use client";

const dummyFollowers = [
    {
      id: '1',
      name: 'John Doe',
      handle: 'johndoe',
      image: 'https://yt3.ggpht.com/ytc/APkrFKZWeMCsx4Q9e_Hm6nhOOUQ3fv96QGUXiMr1-pPP=s48-c-k-c0x00ffffff-no-rj',
      viewerHasFollowed: false,
    },
    {
      id: '2',
      name: 'Jane Smith',
      handle: 'janesmith',
      image: "https://yt3.ggpht.com/ytc/APkrFKZWeMCsx4Q9e_Hm6nhOOUQ3fv96QGUXiMr1-pPP=s48-c-k-c0x00ffffff-no-rj",
      viewerHasFollowed: true,
    },
    {
      id: '3',
      name: 'Alice Johnson',
      handle: 'alicejohnson',
      image:  "https://yt3.ggpht.com/ytc/APkrFKZWeMCsx4Q9e_Hm6nhOOUQ3fv96QGUXiMr1-pPP=s48-c-k-c0x00ffffff-no-rj",
      viewerHasFollowed: false,
    },
  ];
  

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/Button"; // Adjust the import according to your project structure

const FollowersList = () => {
  const [followers] = useState(dummyFollowers); // Using dummy data directly
  const [loading, setLoading] = useState(false); // Set loading state if needed
  const [error, setError] = useState(null); // Set error state if needed

  if (loading) return <div className="text-center text-gray-600">Loading...</div>;
  if (error) return <div className="text-center text-red-600">An error occurred: {error.message}</div>;
  if (followers.length === 0) return <div className="text-center text-gray-600">No followers found.</div>;

  const handleFollow = (id) => {
    // Implement follow/unfollow logic here
    console.log(`Follow/Unfollow user with ID: ${id}`);
  };

  return (
    <div className="p-2">
      <ul role="list" className="divide-y divide-gray-200">
        {followers.map((follower) => (
          <li className="py-4 flex items-center gap-4" key={follower.id}>
            <Image
              src={follower.image || "/default-avatar.png"} // Provide a default image if none exists
              alt={follower.name}
              width={40}
              height={40}
              className="rounded-full"
            />
            <div className="flex-grow">
              <p className="font-semibold text-gray-900">{follower.name}</p>
              <p className="text-gray-600">@{follower.handle}</p>
            </div>
            <Button
              className={`text-blue-500 ${follower.viewerHasFollowed ? "bg-gray-200" : "bg-blue-100"}`}
              onClick={() => handleFollow(follower.id)}
            >
              {follower.viewerHasFollowed ? "Following" : "Follow"}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FollowersList;
