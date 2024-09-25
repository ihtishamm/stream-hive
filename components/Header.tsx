"use client";
import { ArrowLeft, Menu, Search } from "lucide-react";
import { useState, useEffect } from "react";
import { useSidebarContext } from "@/contexts/sidebarContext";
import { isAuth } from "@/lib/token";
import { UserProfile } from "./UserProfile";
import { UploadMenu } from "./uploadMenu";
import Link from "next/link";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export function PageHeader() {
  const [showFullWidthSearch, setShowFullWidthSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    const authStatus = isAuth();
    setIsAuthenticated(authStatus);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/results?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="flex gap-10 lg:gap-20 justify-between pt-2 mb-6 mx-4">
      <PageHeaderFirstSection hidden={showFullWidthSearch} />
      <form
        onSubmit={handleSearchSubmit} // Add onSubmit handler
        className={`flex items-center gap-4 flex-grow justify-center ${showFullWidthSearch ? "flex" : "hidden md:flex"}`}
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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="rounded-l-full border border-secondary-border shadow-inner shadow-secondary py-1 px-4 text-lg w-full focus:border-blue-500 outline-none"
          />
          <Button
            type="submit"
            className="py-2 px-4 rounded-r-full border-secondary-border border border-l-0 flex-shrink-0"
          >
            <Search />
          </Button>
        </div>
      </form>
      <div
        className={`flex-shrink-0 md:gap-2 ${showFullWidthSearch ? "hidden" : "flex"}`}
      >
        <Button
          onClick={() => setShowFullWidthSearch(true)}
          size="icon"
          variant="ghost"
          className="md:hidden"
        >
          <Search />
        </Button>

        {isAuthenticated === null ? null : isAuthenticated ? (
          <>
            <UploadMenu />
            <UserProfile />
          </>
        ) : (
          <Link href="/signin">
            <Button className="mr-4">Sign in</Button>
          </Link>
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
      className={`flex items-center gap-4 flex-shrink-0 ${hidden ? "hidden" : "flex"}`}
    >
      <Button onClick={toggle} variant="ghost" size="icon">
        <Menu />
      </Button>
      <Link href="/">
        <img alt="Logo" className="h-6" />
      </Link>
    </div>
  );
}
