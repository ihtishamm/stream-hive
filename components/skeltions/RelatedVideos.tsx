import { Skeleton } from "../ui/skeleton"; // Adjust based on your project structure

export function RelatedVideos() {
    return (
        <div className="flex flex-col md:flex-row gap-4 py-4">
            <Skeleton className="w-full md:w-1/2 lg:w-1/2 aspect-video rounded-lg" />

            <div className="flex flex-col w-full md:w-1/2 lg:w-1/2">
                <Skeleton className="h-6 w-3/4 mt-2 rounded-md" />

                <Skeleton className="h-4 w-1/2 mt-2 rounded-md" />
                <Skeleton className="h-4 w-1/3 mt-2 rounded-md" />
            </div>
        </div>
    );
}


export function RelatedVideoSkelton() {
    return (
        Array.from({ length: 4 }).map((_, i) => (
            <RelatedVideos key={i} />
        ))
    )
}