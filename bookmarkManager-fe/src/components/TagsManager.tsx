import { Plus } from "lucide-react";
import Button from "./ui/Button";
import Tag from "./ui/Tag";
import { useState } from "react";
import { Input } from "./ui/Input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTag } from "../services/tagService";
import { updateContent } from "../services/contentService";
import toast from "react-hot-toast";

type TagsManagerProps = {
	tags?: string[];
	contentId: string;
};

const TagsManager = ({ tags = [], contentId }: TagsManagerProps) => {
	const [newTag, setNewTag] = useState("");
	const [isAddiing, setIsAdding] = useState(false);
    const [allTags, setAllTags] = useState(tags);

	const queryClient = useQueryClient();

	// Mutation to create a new tag
	const { mutate: addTag, isPending } = useMutation({
		mutationFn: (tagId: string) => createTag(tagId),
		onSuccess: (newTagId: string) => {
			if (allTags.includes(newTagId)) {
				toast.error("This tag has already been added.");
				return;
			}
            setAllTags((prevTagIds) => [...prevTagIds, newTagId])
            updateContentWithTag([...allTags, newTagId]);
		},
		onError: (error: Error) => {
			console.error("Error creating tag:", error);
		},
	});

	const { mutate: updateContentWithTag } = useMutation({
		mutationFn: (tags: string[]) =>
			updateContent({ contentId, tags }),
		onSuccess: () => {
            toast.success("Updated Successfully");
			queryClient.invalidateQueries({ queryKey: ["content"] });
		},
		onError: (error) => {
			console.error("Error updating content with tag:", error);
		},
	});

	const handleAddTag = () => {
		const trimmedTag = newTag.trim();
		if (trimmedTag) {
			addTag(trimmedTag);
			setIsAdding(false);
			setNewTag("");
		} else {
			toast.error("Tag Name cannot be empty");
			setIsAdding(false);
		}
	};

    const removeTag = (tagId: string) => {
        setAllTags((prevTagIds) => prevTagIds.filter((id) => id !== tagId));
        updateContentWithTag(allTags.filter((id) => id !== tagId));
      }

	if (!allTags || allTags.length === 0) {
		return (
			<div className="w-full bg-white rounded-xl p-4 text-primary flex items-center gap-3">
				{isAddiing ? (
					<Input
						type="text"
						value={newTag}
						placeholder="Enter tag name"
						autoFocus
						onChange={(e) => setNewTag(e.target.value)}
						onBlur={handleAddTag}
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								handleAddTag();
							}
						}}
					/>
				) : (
					<Button
						className="flex items-center rounded-full gap-1 px-2 py-1.5"
						disabled={isPending}
						onClick={() => setIsAdding(true)}
					>
						<Plus />
						{isPending ? "Adding..." : "Add Tag"}
					</Button>
				)}
				No tags to display
			</div>
		);
	}
	return (
		<div className="w-full flex flex-wrap gap-2 items-center bg-white rounded-xl p-4">
			{isAddiing ? (
				<Input
					type="text"
					value={newTag}
					placeholder="Enter tag name"
					autoFocus
					onChange={(e) => setNewTag(e.target.value)}
					onBlur={handleAddTag}
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							handleAddTag();
						}
					}}
				/>
			) : (
				<Button
					className="flex items-center rounded-full gap-1 px-2 py-1.5"
					disabled={isPending}
					onClick={() => setIsAdding(true)}
				>
					<Plus />
					{isPending ? "Adding..." : "Add Tag"}
				</Button>
			)}
			{allTags.map((tagId) => {
				return <Tag id={tagId} key={tagId} removeTag={removeTag} />;
			})}
		</div>
	);
};

export default TagsManager;
