import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import Link from "next/link"
import { me } from "@/gqlClient/user"
import { useQuery } from "urql"
import getInitials from "@/Utils/getInitials"
import generateUniqueChannelName from "@/Utils/getUniqueChannelName"

export function UserProfile() {
    const [{ data, fetching, error }, replay] = useQuery({
        query: me,
    })


    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size="icon" variant="ghost" className="rounded-full">
                    <User />
                </Button>
            </DropdownMenuTrigger>
            {
                error && <div>Something went wrong</div>
            }
            <DropdownMenuContent className="w-56 mr-10">
                <DropdownMenuLabel>
                    <div className="flex gap-3 mb-8">
                        <>
                            <Avatar>
                                <AvatarImage src={data?.me?.image} alt="user profile pic" />
                                <AvatarFallback>{getInitials(data?.me?.name)}</AvatarFallback>
                            </Avatar>
                        </>
                        <div>
                            <div className="font-bold">{data?.me?.name}</div>
                            <div className="text-sm text-gray-500 mt-1">@{data?.me?.handle ?? generateUniqueChannelName(data?.me?.name)}</div>
                        </div>
                    </div>
                    <Link href={`/channel/${data?.me?.id}`} className="mt-10 text-blue-700 font-semibold">View your channel</Link>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <h2 className=" font-semibold">Log out</h2>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
