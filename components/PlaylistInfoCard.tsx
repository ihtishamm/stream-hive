import Image from "next/image";
import { Playlist } from "@/types";

export const PlaylistInfoCard = ({ playlist }: { playlist: Playlist }) => {
  return (
    <div className="bg-white dark:bg-black p-6 rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-700 sticky">
      <div className="relative w-full h-60">
        <Image
          src={playlist?.FirstvideoThumbnail}
          alt="playlist"
          fill
          className="object-fill rounded-lg"
        />
      </div>
      <div className="mt-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          {playlist.title}
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {Date.now() - Number(playlist.createdAt)} days ago
        </p>
        <p className="mt-2 text-gray-800 dark:text-gray-200">
          {playlist.description}
        </p>
        <div className="mt-4 text-gray-700 dark:text-gray-300">
          <p>
            <span className="font-semibold">{playlist.videoCount} videos</span>
          </p>
        </div>
      </div>
    </div>
  );
};
