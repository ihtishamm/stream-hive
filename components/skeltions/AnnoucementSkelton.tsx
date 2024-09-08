import { Skeleton } from "@/components/ui/skeleton";

export function AnnouncementSkeleton() {
    return (
        <div className="py-6 bg-gray-100 rounded-lg shadow-md">
            <div className="flex gap-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="flex-1 space-y-2">
                    <div className="space-y-1">
                        <Skeleton className="h-4 w-[150px]" />
                        <Skeleton className="h-4 w-[100px]" />
                    </div>
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-6 w-[80%]" />
                    <div className="flex gap-4 mt-2">
                        <Skeleton className="h-4 w-8" />
                        <Skeleton className="h-4 w-8" />
                    </div>
                </div>
            </div>
        </div>
    );
}
