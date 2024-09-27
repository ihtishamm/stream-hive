"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Spinner from "./Spinner";
import { useQuery } from "urql";
import { currentUserPlaylist } from "@/gqlClient/Playlist";
import { currentUserPlaylistResponse } from "@/types";
import Link from "next/link";


export const UserPlaylistsStack = () => {
    const [{ data, fetching, error }] = useQuery<currentUserPlaylistResponse>({ query: currentUserPlaylist });
    const items = data?.getCurrentUserPlaylists;

    if (fetching) return <div className="mt-24"> <Spinner /></div>
    if (error) return <div>Error: {error.message}</div>;
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
