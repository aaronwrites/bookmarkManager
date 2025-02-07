import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { generateShareLink } from "../services/shareService";
import toast from "react-hot-toast";
import Button from "./ui/Button";
import { Copy, Link2, Unlink } from "lucide-react";

const ShareModal = () => {
    
  const [shareLink, setShareLink] = useState<string | null>(null);
  const [isShared, setIsShared] = useState(false);

  const { mutate: toggleShare } = useMutation({
    mutationFn: () => generateShareLink(!isShared),
    onSuccess: (data) => {
      if (isShared) {
        setShareLink(null);
        setIsShared(false);
        toast.success("Share link revoked!");
      } else {
        const generatedLink = `${window.location.origin}/share/${data.hash}`;
        setShareLink(generatedLink);
        setIsShared(true);
        toast.success("Share link generated!");
      }
    },
    onError: (error) => {
      toast.error("Failed to generate share link");
      console.error("Error sharing:", error);
    },
  });

  const copyToClipboard = () => {
    if (shareLink) {
      navigator.clipboard.writeText(shareLink);
      toast.success("Link copied to clipboard!");
    }
  };

  return (
    <div className="p-5 w-[90%] lg:w-[400px] bg-white rounded-xl">
          <h3 className="text-lg font-semibold">Share Your Vault</h3>
          <p className="text-muted text-sm mt-1">
            {isShared
              ? "Your vault is currently shared. You can revoke the link anytime."
              : "Generate a public shareable link for your bookmarks."}
          </p>
          {shareLink && (
            <div className="mt-3 flex items-center gap-2 border rounded-lg p-2">
              <input
                type="text"
                value={shareLink}
                readOnly
                className="flex-1 bg-transparent text-sm outline-none"
              />
              <Button size="sm" variant="outline" onClick={copyToClipboard}>
                <Copy size={16} />
              </Button>
            </div>
          )}
          {!isShared ? 
          <Button onClick={() => toggleShare()} className="mt-3 w-full flex items-center gap-2">
            <Link2 />
            Generate Share Link
          </Button> :
          <Button onClick={() => toggleShare()} variant={"outline"} className="mt-3 w-full border-red-500 hover:bg-red-500 flex items-center">
            <Unlink />
            Revoke Public Link
        </Button>
          }
        </div>
  )
}

export default ShareModal