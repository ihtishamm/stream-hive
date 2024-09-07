"use client";
import { ArrowLeft, Bell, Menu, Mic, Search, Upload, User } from "lucide-react";
import { Button } from "../components/Button";
import { useState, useEffect } from "react";
import { useSidebarContext } from "@/contexts/sidebarContext";
import { isAuth } from "@/lib/token";
import { UserProfile } from "./UserProfile";

export function PageHeader() {
  const [showFullWidthSearch, setShowFullWidthSearch] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null); // Start with `null` to indicate loading state

  // Ensure `isAuth()` is called only on the client side
  useEffect(() => {
    // Simulating token check (it happens on the client only)
    const authStatus = isAuth();
    setIsAuthenticated(authStatus);
  }, []); // Runs only once on the client side after the first render

  return (
    <div className="flex gap-10 lg:gap-20 justify-between pt-2 mb-6 mx-4">
      <PageHeaderFirstSection hidden={showFullWidthSearch} />
      <form
        className={`flex items-center gap-4 flex-grow justify-center ${showFullWidthSearch ? "flex" : "hidden md:flex"
          }`}
      >
        {showFullWidthSearch && (
          <Button
            onClick={() => setShowFullWidthSearch(false)}
            type="button"
            size="icon"
            variant="ghost"
            className="flex-shrink-0"
          >
            <ArrowLeft />
          </Button>
        )}
        <div className="flex flex-grow max-w-[600px]">
          <input
            type="search"
            placeholder="Search"
            className="rounded-l-full border border-secondary-border shadow-inner shadow-secondary py-1 px-4 text-lg w-full focus:border-blue-500 outline-none"
          />
          <Button className="py-2 px-4 rounded-r-full border-secondary-border border border-l-0 flex-shrink-0">
            <Search />
          </Button>
        </div>
        <Button type="button" size="icon" className="flex-shrink-0">
          <Mic />
        </Button>
      </form>
      <div
        className={`flex-shrink-0 md:gap-2 ${showFullWidthSearch ? "hidden" : "flex"
          }`}
      >
        <Button
          onClick={() => setShowFullWidthSearch(true)}
          size="icon"
          variant="ghost"
          className="md:hidden"
        >
          <Search />
        </Button>
        <Button size="icon" variant="ghost" className="md:hidden">
          <Mic />
        </Button>
        <Button size="icon" variant="ghost">
          <Upload />
        </Button>
        <Button size="icon" variant="ghost">
          <Bell />
        </Button>


        {isAuthenticated === null ? (
          <Button size="icon" variant="ghost" disabled>
            {/* You can put a spinner or placeholder here */}
            Loading...
          </Button>
        ) : isAuthenticated ? (
          <UserProfile />
        ) : (
          <Button size="icon" variant="ghost">
            Login
          </Button>
        )}
      </div>
    </div>
  );
}

type PageHeaderFirstSectionProps = {
  hidden?: boolean;
};

export function PageHeaderFirstSection({
  hidden = false,
}: PageHeaderFirstSectionProps) {
  const { toggle } = useSidebarContext();

  return (
    <div
      className={`flex items-center gap-4 flex-shrink-0 ${hidden ? "hidden" : "flex"
        }`}
    >
      <Button onClick={toggle} variant="ghost" size="icon">
        <Menu />
      </Button>
      <a href="/">
        <img alt="Logo" className="h-6" />
      </a>
    </div>
  );
}
