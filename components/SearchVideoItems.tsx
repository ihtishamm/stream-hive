"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { formatDuration } from "@/Utils/formatDuration"
import { formatTimeAgo } from "@/Utils/formatTimeAgo"

type VideoGridItemProps = {
  id: string
  title: string
  channel: {
    id: string
    name: string
    profileUrl: string
  }
  views: number
  postedAt: Date
  duration: number
  thumbnailUrl: string
  videoUrl: string
}

const VIEW_FORMATTER = new Intl.NumberFormat(undefined, { notation: "compact" })

export function SearchVideoItem({
  id,
  title,
  channel,
  views,
  postedAt,
  duration,
  thumbnailUrl,
  videoUrl,
}: VideoGridItemProps) {
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
      className="flex flex-col md:flex-row gap-4 py-4"
      onMouseEnter={() => setIsVideoPlaying(true)}
      onMouseLeave={() => setIsVideoPlaying(false)}
    >
      {/* Video Thumbnail */}
      <div className="relative w-full md:w-1/2 lg:w-1/2 aspect-video">
        <Link href={`/watch/${id}`}>
          <Image
            src={thumbnailUrl}
            alt={title}
            fill
            className={`block w-full h-full object-cover transition-[border-radius] duration-200 ${
              isVideoPlaying ? "rounded-none" : "rounded-xl"
            }`}
          />
          <div className="absolute bottom-1 right-1 bg-secondary-dark text-secondary text-sm px-0.5 rounded">
            {formatDuration(duration)}
          </div>
          <video
            className={`block h-full object-cover absolute inset-0 transition-opacity duration-200 ${
              isVideoPlaying ? "opacity-100 delay-200" : "opacity-0"
            }`}
            ref={videoRef}
            muted
            playsInline
            src={videoUrl}
          />
        </Link>
      </div>

      <div className="flex flex-col w-full md:w-1/2 lg:w-1/2">
        <Link href={`/watch/${id}`} className="font-bold text-lg mb-1">
          {title}
        </Link>
        <Link href={`/@${channel.id}`} className="text-secondary-text text-sm mb-1">
          {channel.name}
        </Link>
        <div className="text-secondary-text text-sm">
          {VIEW_FORMATTER.format(views)} Views • {formatTimeAgo(postedAt)}
        </div>
      </div>
    </div>
  )
}
