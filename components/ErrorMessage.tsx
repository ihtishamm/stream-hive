import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ErrorComponent({ onRetry }: { onRetry: () => void }) {
    return (
        <div className="flex flex-col items-center justify-center h-full space-y-4">
            <AlertCircle className="w-12 h-12 text-red-500" />
            <p className="text-lg text-center text-secondary-text">
                Oops! There seems to be an issue with your internet connection.
            </p>
            <Button onClick={onRetry} className="bg-primary">
                Retry
            </Button>
        </div>
    );
}
