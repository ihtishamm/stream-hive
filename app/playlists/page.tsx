"use client";
import { UserPlaylistsStack } from "@/components/UserPlaylistsCard";
import { isAuth } from "@/lib/token";
import Link from "next/link";

export default function Allplaylists() {
  const isAuthenticated = isAuth();

  return (
    <div className="p-8">
      {!isAuthenticated ? (
        <div className="flex flex-col items-center justify-center h-64">
          <p className="text-xl mb-4">You need to Sign in to view your playlists.</p>
          <Link href="/signin">
            <button className="bg-primary-500 text-white px-4 py-2 rounded-lg">
              Log In
            </button>
          </Link>
        </div>
      ) : (
        <>
          <div className="p-8">

            <h1 className="text-2xl font-bold mb-6">All Playlists</h1>
            <UserPlaylistsStack />
          </div>
        </>
      )}
    </div>
  );
}
