"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

type PlaylistCard = {
  id: number;
  thumbnailUrl: string;
  videoCount: number;
  playlistName: string;
  channelName: string;
};

export const PlaylistCardStack = ({
  items,
  offset,
  scaleFactor,
}: {
  items: PlaylistCard[];
  offset?: number;
  scaleFactor?: number;
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((card) => (
        <motion.div
          key={card.id}
          className="bg-white dark:bg-black rounded-xl p-4 shadow-xl border border-neutral-200 dark:border-white/[0.1] shadow-black/[0.1] dark:shadow-white/[0.05] transition-transform hover:scale-105"
        >
          <div className="relative h-40 w-full">
            <Image
              src={card.thumbnailUrl}
              alt={card.playlistName}
              fill
              className="object-cover rounded-lg"
            />
            <div className="absolute bottom-2 right-2 bg-black text-white text-sm px-2 py-1 rounded">
              {card.videoCount} videos
            </div>
          </div>
          <div className="mt-3">
            <p className="text-neutral-900 dark:text-neutral-100 font-bold">
              {card.playlistName}
            </p>
            <p className="text-neutral-500 dark:text-neutral-300 text-sm">
              {card.channelName}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
