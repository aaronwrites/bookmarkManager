import { usePreview } from "../hooks/usePreview";
import { contentType } from "../types/contentTypes";
// import { useState } from "react";
import { Tweet } from "react-tweet";
import fallbackImg from "../assets/image.png";
import { ExternalLink } from "lucide-react";

const ContentModal = ({ content }: { content: contentType }) => {
    const { data, isError, isTweet } = usePreview(content.link);
    // const [updates, setUpdates] = useState({
    //     title: content.title || data?.title || "",
    //     tldr: content.tldr || ""
    // })
    // const [isModified, setIsModified] = useState(false);
    


    return (
        <div className="h-full w-full grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 p-1 gap-5">
            <div className="xl:col-span-2 flex flex-col gap-6 p-2">
                <div className="flex flex-col gap-2">
                    <input type="text" className="p-2 font-bold text-xl outline-none" placeholder="Title goes here" />
                    <div className="bg-[#F7F7F7] text-sm cursor-pointer w-fit max-w-64 flex items-center gap-1 p-2 rounded-full hover:bg-[#e2e1e1] group">
                        <div className="truncate group-hover:underline">
                            <a href={content.link}>{content.link}</a>
                        </div>
                        <div>
                            <ExternalLink size={16} />
                        </div>
                    </div>
                </div>
                <div className="h-full flex items-center justify-center rounded-xl bg-[#F7F7F7]/50" data-theme="light">
                    {isTweet ? (
                        <Tweet id={content.link.split("/status/")[1]} />
                            ) : (
                        <img
                            src={isError ? fallbackImg : data?.image || fallbackImg}
                            alt="Preview"
                            className="w-full object-center"
                        />
                    )}
                </div>
            </div>
            <div className="rounded-xl xl:col-span-1 bg-[#F7F7F7] p-2 flex flex-col gap-5">
                <div className="h-36 bg-white rounded-xl">
                    Tags GO HERE
                </div>
                <div className="relative bg-white p-5 rounded-xl">
                    <div className="absolute bg-white top-1 left-8 p-2">
                        <p className="font-bold text-sm text-primary/70">TL;DR</p>
                    </div>
                    <textarea maxLength={500} name="tldr" id="tldr" placeholder="TL;DR for this bookmark goes here..." className="rounded-xl h-72 resize-none border-2 border-primary/30 p-5 w-full text-muted outline-primary">
                        {content.tldr}
                    </textarea>
                </div>
            </div>
        </div>
    );
    };

export default ContentModal;
