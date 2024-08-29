"use client"
import { useParams } from "next/navigation"
export default function Watch () {
    const { v } = useParams()
    return (
      <div>page.. {v}</div>
    )
  }
  