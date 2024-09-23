"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { formatDuration } from "@/Utils/formatDuration"
import { formatTimeAgo } from "@/Utils/formatTimeAgo"

import { Video } from "@/types"

const VIEW_FORMATTER = new Intl.NumberFormat(undefined, { notation: "compact" })

export function VideoGridItem({
  id,
  title,
  user,
  createdAt,
  thumbnailUrl,
  videoUrl,
  viewsCount
}: Video) {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)


  useEffect(() => {
    const videoElement = videoRef.current
    if (videoElement == null) return

    if (isVideoPlaying) {
      videoElement.currentTime = 0
      videoElement.play()
    } else {
      videoElement.pause()
    }
  }, [isVideoPlaying])

  return (
    <div
      className="flex flex-col gap-2"
      onMouseEnter={() => setIsVideoPlaying(true)}
      onMouseLeave={() => setIsVideoPlaying(false)}
    >
      <Link href={`/watch/${id}`} className="relative aspect-video">
        <Image
          src={thumbnailUrl}
          alt={title}
          fill
          className={`block w-full h-full object-cover transition-[border-radius] duration-200 ${isVideoPlaying ? "rounded-none" : "rounded-xl"
            }`}
        />
        <div className="absolute bottom-1 right-1 bg-secondary-dark text-secondary text-sm px-0.5 rounded">
          {formatDuration(938)}
        </div>
        <video
          className={`block h-full object-cover absolute inset-0 transition-opacity duration-200 ${isVideoPlaying ? "opacity-100 delay-200" : "opacity-0"
            }`}
          ref={videoRef}
          muted
          playsInline
          src={videoUrl}
        />
      </Link>
      <div className="flex gap-2">
        <Link href={`/channel/${user?.id}`} className="flex-shrink-0">
          <Image
            src={user?.image ?? ""}
            alt={user?.name}
            width={48} // 12 * 4 = 48px
            height={48}
            className="w-12 h-12 rounded-full"
          />
        </Link>
        <div className="flex flex-col">
          <Link href={`/watch/${id}`} className="font-bold">
            {title}
          </Link>
          <Link href={`/channel/${user?.id}`} className="text-secondary-text text-sm">
            {user?.name}
          </Link>
          <div className="text-secondary-text text-sm">
            {(createdAt && viewsCount) && VIEW_FORMATTER.format(viewsCount)} Views • {formatTimeAgo(new Date("2023-08-29"))}
          </div>
        </div>
      </div>
    </div>
  )
}
