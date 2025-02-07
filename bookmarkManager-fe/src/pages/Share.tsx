import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getSharedContent } from "../services/shareService";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { contentType } from "../types/contentTypes";
import ContentCard from "../components/ui/ContentCard";
import { Bookmark } from "lucide-react";
import { Logo } from "../assets/Logo";

const SharePage = () => {
  const { hash } = useParams();

  const { isPending, data, isError, error } = useQuery({
    queryKey: ["shared-content", hash],
    queryFn: () => getSharedContent(hash!),
    enabled: !!hash,
    retry: false
  });

  if (isPending) {
    return (
      <div className="relative min-h-screen flex flex-col justify-center items-center">
        <div className="absolute left-1/2 -translate-x-1/2 w-[300px] h-[300px] lg:w-[1000px] lg:h-[1000px] bg-[#ef3b33] opacity-25 blur-[100px] rounded-full"></div>
        <header className="flex justify-center py-10">
            <Logo />
        </header>
        <p className="text-xl text-muted font-bold">Loading shared bookmarks...</p>
      </div>
    );
  }

  if (isError) {
    if(error.message.includes("undefined")) {
        return (
            <div className="relative h-full flex flex-col justify-center items-center">
                <div className="absolute left-1/2 -translate-x-1/2 w-[300px] h-[300px] lg:w-[1000px] lg:h-[1000px] bg-[#ef3b33] opacity-25 blur-[100px] rounded-full"></div>
        <header className="flex justify-center py-10">
            <Logo />
        </header>
              <p className="text-xl text-red-500 font-bold">User has not enabled sharing or the link is invalid.</p>
            </div>
          );
    }
    return (
      <div className="relative min-h-screen flex flex-col justify-center items-center">
        <div className="absolute left-1/2 -translate-x-1/2 w-[300px] h-[300px] lg:w-[1000px] lg:h-[1000px] bg-[#ef3b33] opacity-25 blur-[100px] rounded-full"></div>
        <header className="flex justify-center py-10">
            <Logo />
        </header>
        <p className="text-xl text-muted font-bold">Error fetching shared bookmarks.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-5 mb-10 relative">
        <div className="absolute left-1/2 -translate-x-1/2 w-[300px] h-[300px] lg:w-[1000px] lg:h-[1000px] bg-[#ef3b33] opacity-25 blur-[100px] rounded-full"></div>
            <header className="flex justify-center py-10">
                    <Logo />
            </header>
      <div className="mb-8 p-2 flex flex-col items-center gap-3">
        <h2 className="text-xl lg:text-3xl font-bold text-primary flex items-center gap-3">
          Shared with You <Bookmark size={30} />
        </h2>
        <p className="text-muted text-sm font-semibold">Vault Belongs to: {data?.content[0].userId.username}</p>
      </div>

      <ResponsiveMasonry
                columnsCountBreakPoints={{350: 1, 750: 2, 900: 4}}
      >
        <Masonry gutter="24px">
          {data?.content.map((content : contentType) => (
            <ContentCard
              key={content._id}
              content={content}
            />
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </div>
  );
};

export default SharePage;
