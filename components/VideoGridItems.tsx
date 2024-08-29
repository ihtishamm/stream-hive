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

export function VideoGridItem({
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
      className="flex flex-col gap-2"
      onMouseEnter={() => setIsVideoPlaying(true)}
      onMouseLeave={() => setIsVideoPlaying(false)}
    >
      <Link href={`/watch?v=${id}`} className="relative aspect-video">
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
      <div className="flex gap-2">
        <Link href={`/@${channel.id}`} className="flex-shrink-0">
          <Image
            src={channel.profileUrl}
            alt={channel.name}
            width={48} // 12 * 4 = 48px
            height={48}
            className="w-12 h-12 rounded-full"
          />
        </Link>
        <div className="flex flex-col">
          <Link href={`/watch?v=${id}`} className="font-bold">
            {title}
          </Link>
          <Link href={`/@${channel.id}`} className="text-secondary-text text-sm">
            {channel.name}
          </Link>
          <div className="text-secondary-text text-sm">
            {VIEW_FORMATTER.format(views)} Views • {formatTimeAgo(postedAt)}
          </div>
        </div>
      </div>
    </div>
  )
}
