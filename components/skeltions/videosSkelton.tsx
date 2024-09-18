import { Skeleton } from "@/components/ui/skeleton";

export function VideoSkeleton() {
    return (
        <div className="flex flex-col gap-2 w-full">

            <div className="relative aspect-video w-full">
                <Skeleton className="h-full w-full rounded-xl" />
            </div>

            <div className="flex gap-2 mt-2">
                <Skeleton className="w-12 h-12 rounded-full" />

                <div className="flex flex-col flex-1 space-y-2">
                    <Skeleton className="h-4 w-[60%]" />
                    <Skeleton className="h-3 w-[40%]" />
                    <Skeleton className="h-3 w-[50%]" />
                </div>
            </div>
        </div>
    );
}

export function VideoSkeletonGrid() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:px-6 lg:px-12">
            {Array.from({ length: 10 }).map((_, i) => (
                <VideoSkeleton key={i} />
            ))}
        </div>
    );
}
