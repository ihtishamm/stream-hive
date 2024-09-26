"use client";


import Image from "next/image";
import { Button } from "@/components/Button";
import { followUser, userFollowers } from "@/gqlClient/user";
import { useMutation, useQuery } from "urql";
import { userFollowersResponse } from "@/types";
import { UserRoundCheck, UserRoundPlus } from "lucide-react";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";

const FollowersList = ({ userId, currentUser }: { userId: string, currentUser: string }) => {
  const [initialFetchComplete, setInitialFetchComplete] = useState(false);

  const [{ data, fetching, error }, replay] = useQuery<userFollowersResponse>({
    query: userFollowers,
    variables: { userId: userId }
  });


  useEffect(() => {
    if (!fetching && !initialFetchComplete) {
      setInitialFetchComplete(true);
    }
  }, [fetching, initialFetchComplete]);

  const [result, followUserMutation] = useMutation(followUser);
  const { fetching: refetch } = result;

  const handleFollow = async () => {
    try {
      const result = await followUserMutation({ input: { followingId: userId } });
      if (result.data) {
        await replay({ requestPolicy: 'network-only' })
      }
    } catch (error) {
      console.error("Error following user:", error);
    }
  };

  if (!initialFetchComplete) {
    return (
      <Spinner />
    );
  }
  if (error) {
    return <p>Error fetching user</p>;
  }
  if (data?.getUserFollowers.length === 0) return <div className="text-center text-gray-600">No followers found.</div>;

  return (
    <div className="p-2">
      <ul role="list" className="divide-y divide-gray-200">
        {data?.getUserFollowers?.map((follower) => (
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
              <p className="text-gray-600">{follower.handle}</p>
            </div>
            {currentUser !== userId &&
              (
                follower.hasFollowed ? (
                  <Button className="mt-4 flex items-center gap-2 px-4 bg-red-500" variant="default" onClick={handleFollow} disabled={refetch}>
                    <UserRoundCheck />Following
                  </Button>
                ) : (
                  <Button className="mt-4 flex items-center gap-2 px-4" variant="default" onClick={handleFollow} disabled={refetch}>
                    <UserRoundPlus />Follow
                  </Button>
                )
              )
            }
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FollowersList;
