// AuthDialog.tsx

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface AuthDialogProps {
    isOpen: boolean;
    onClose: () => void;
    actionText: string;
}

const AuthDialog: React.FC<AuthDialogProps> = ({ isOpen, onClose, actionText }) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Authentication Required</DialogTitle>
                    <DialogDescription>
                        You need to be logged in to {actionText}. Please log in to continue.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex justify-end space-x-2 mt-4">
                    <Button variant="outline" onClick={onClose}>
                        Close
                    </Button>
                    <Link href={"/signin"}> <Button onClick={onClose}>
                        Log In
                    </Button>
                    </Link>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default AuthDialog;
