import Image from "next/image";
import { subscriptions } from "@/dummy-data/Sidebar";
import { Button } from "@/components/Button";

export default function UserChannel() {
  const Immage = `https://yt3.googleusercontent.com/NbeXiY_cA3_-6tujF7Ucf8QSxAy2z5x-My8UYiwyCW9truF3Yc0myEZQlTJeI8sSkc-xYX9KMQ=w1707-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj`;

  return (
    <div className="min-h-screen w-full">
      <div className="gap-4">
       
        <div className="px-2 md:px-8 py-2 w-full rounded-lg">
          <Image
            src={Immage}
            width={1707}
            height={300}
            objectFit="cover"
            className="rounded-lg"
            alt="Channel Banner"
          />
        </div>

       
        <div className="flex flex-col md:flex-row p-8 gap-6">
          <div className="flex-shrink-0">
            <Image
              src={subscriptions[0].imgUrl}
              width={176}
              height={176}
              objectFit="cover"
              className="rounded-full"
              alt="Profile Image"
            />
          </div>

          <div>
            <h1 className="text-2xl font-bold">TeenWolf Gaming</h1>
            <div className="flex flex-col lg:flex-row lg:items-center gap-1 lg:gap-2 mt-2">
              <span className="text-sm text-gray-600">@TeemWrokgagmig</span>
              <span className="hidden lg:inline-block">•</span>
              <span className="text-sm text-gray-600">9.9k Subscribers</span>
              <span className="hidden lg:inline-block">•</span>
              <span className="text-sm text-gray-600">43 videos</span>
            </div>
            <p className="mt-4 text-gray-700">
              Hey, this is my YouTube channel. Make sure to subscribe!
            </p>

            <Button className="mt-4">Subscribe</Button>
          </div>
        </div>
      </div>
      <div className="p-8">
    
        <div className="text-center text-gray-500">Tabs, etc...</div>
      </div>
    </div>
  );
}
