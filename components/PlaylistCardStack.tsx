"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useQuery } from "urql";
import { userplaylists } from "@/gqlClient/Playlist";
import { PlaylistResponse } from "@/types";
import Spinner from "./Spinner";
import { Link } from "lucide-react";


export const PlaylistCardStack = ({ userId }: { userId: string }) => {
  const [{ data, fetching, error }] = useQuery<PlaylistResponse>({
    query: userplaylists,
    variables: { userId },
  });

  if (fetching) return <Spinner />
  if (error) return <div>Error: {error.message}</div>;
  const items = data?.getUserPlaylists;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items?.map((card) => (
        <motion.div
          key={card.id}
          className="bg-white dark:bg-black rounded-xl p-4 shadow-xl dark:border-white/[0.1] shadow-black/[0.1] dark:shadow-white/[0.05] transition-transform hover:scale-105"
        >
          <Link href={`/playlists/${card.id}`}>
            <div className="relative h-40 w-full">
              <Image
                src={card.FirstvideoThumbnail}
                alt="playlist"
                fill
                className="object-fill rounded-lg"
              />
              <div className="absolute bottom-2 right-2 bg-black text-white text-sm px-2 py-1 rounded">
                {card?.videoCount} videos
              </div>
            </div>
          </Link>
          <div className="mt-3">
            <p className="text-neutral-900 dark:text-neutral-100 font-bold">
              {card.title}
            </p>
            <p className="text-neutral-500 dark:text-neutral-300 text-sm">
              {card.user.name}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
