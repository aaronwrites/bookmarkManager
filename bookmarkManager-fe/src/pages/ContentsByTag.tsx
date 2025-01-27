import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getContentsByTag } from "../services/contentService";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import ContentCard from "../components/ui/ContentCard";
import { contentType } from "../types/contentTypes";
import { useState } from "react";
import Modal from "../components/ui/Modal";
import ContentModal from "../components/ContentModal";
import Button from "../components/ui/Button";
import { ArrowLeft } from "lucide-react";

const ContentsByTag = () => {
	const { tagId } = useParams(); 
    const navigate = useNavigate();

    if (!tagId) {
        return <div>No Tag selected.</div>;
    }
	const [selectedContent, setSelectedContent] = useState<contentType | null>(
		null
	);

	const { data, isPending, error } = useQuery({
		queryKey: ["contentsByTag", tagId],
		queryFn: () => getContentsByTag(tagId),
        retry: false
	});

	if (isPending) {
		return (
        <div className="min-h-screen flex justify-center items-center">
            <p className="text-xl text-muted font-bold">Loading Contents...</p>
        </div>
        );
	}

	if (error) {
			return (
				<div className="min-h-screen flex flex-col justify-center items-center gap-4">
					<p className="text-lg text-gray-600 font-semibold">
						No contents found for this tag.
					</p>
					<Button variant="ghost" onClick={() => navigate("/tags")}>
						<ArrowLeft />
						<p>Back to All tags</p>
					</Button>
				</div>
			);
	}


    const routeToHome = () => {
        navigate("/tags");
    }

	return (
		<div className="min-h-screen p-5">
            <Button variant={"ghost"} onClick={routeToHome} className="rounded-full" >
                <ArrowLeft />
                <p>Back to All Tags</p>
            </Button>
            <div className="p-3 flex items-center gap-2">
                <h1 className="text-xl font-bold">Showing results for bookmarks with the tag </h1>
                <span className="px-2 py-1 bg-primary text-white rounded-full text-md">{data?.tag.tagName}</span>
            </div>
			<ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 4 }}>
				<Masonry gutter="24px">
					{data?.content.map((content: contentType) => (
						<ContentCard
							key={content._id}
							content={content}
							onClickHandler={() => setSelectedContent(content)}
						/>
					))}
				</Masonry>
			</ResponsiveMasonry>
			<Modal
				isOpen={!!selectedContent}
				onClose={() => setSelectedContent(null)}
				className="rounded-xl sm:rounded-lg lg:rounded-2xl w-[90%] h-[90%] lg:w-[80vw] lg:h-[80vh] max-w-screen max-h-screen overflow-scroll"
			>
				{selectedContent && <ContentModal content={selectedContent} />}
			</Modal>
		</div>
	);
};

export default ContentsByTag;
