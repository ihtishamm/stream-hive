import { Skeleton } from "@/components/ui/skeleton";

export function VideoTitle() {
    return (
        <div className="flex flex-col space-y-4 mb-6 mt-6">
            <Skeleton className="h-8 w-full max-w-[600px]" />

            <Skeleton className="h-6 w-[80%]" />


            <div className="border-t border-gray-200 my-4" />


            <div className="flex items-center space-x-4">

                <Skeleton className="h-10 w-10 rounded-full" />

                <Skeleton className="h-6 w-[150px]" />

                <div className="flex space-x-2">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <Skeleton className="h-8 w-8 rounded-full" />
                </div>
            </div>
        </div>
    );
}

export default VideoTitle;
