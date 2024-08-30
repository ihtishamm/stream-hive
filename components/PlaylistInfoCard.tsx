import Image from "next/image";

interface PlaylistInfoProps {
  playlist: {
    id: string;
    title: string;
    description: string;
    videoCount: number;
    playlistThumbnail: string;
    createdAt: Date;
  };
}

export const PlaylistInfoCard: React.FC<PlaylistInfoProps> = ({ playlist }) => {
  return (
    <div className="bg-white dark:bg-black p-6 rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-700">
      <div className="relative w-full h-60">
        <Image
          src={playlist.playlistThumbnail}
          alt={playlist.title}
          fill
          className="object-cover rounded-lg"
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
            <span className="font-semibold">Video Count:</span> {playlist.videoCount}
          </p>
        </div>
      </div>
    </div>
  );
};
