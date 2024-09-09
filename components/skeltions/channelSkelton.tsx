import { Skeleton } from "../ui/skeleton";

const ChannelSkeleton = () => {
    return (
        <div className="min-h-screen w-full p-8">
            <Skeleton className="w-full h-48 rounded-lg" />
            <Skeleton className="w-48 h-48 mt-4 rounded-full" />
            <Skeleton className="w-3/4 h-6 mt-4" />
            <Skeleton className="w-1/2 h-6 mt-2" />
            <Skeleton className="w-full h-6 mt-4" />
        </div>
    );
}

export default ChannelSkeleton;