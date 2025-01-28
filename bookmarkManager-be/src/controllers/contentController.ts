import { contentModel, tagsModel } from "../database/db";
import { StatusCode } from "..";
import { Request, Response } from "express";

export const getAllContents = async (req: Request, res: Response) => {
	const id = req.userId;
	try {
		const content = await contentModel
			.find({
				userId: id,
			})
			.populate("userId", "username");
		res.status(StatusCode.OK).json({
			success: true,
			content,
		});
	} catch (e) {
		res.status(StatusCode.SeverError).json({
			success: false,
			message: "An error occured while fetching contents",
			error: e,
		});
	}
};

export const getContentByTag = async (req: Request, res: Response) => {
	try {
		const { tagId } = req.query;

		if (!tagId) {
			res.status(StatusCode.BadRequest).json({ message: "Tag ID is required" });
			return;
		}
		const content = await contentModel.find({ tags: tagId });
		const tag = await tagsModel.findOne({ _id: tagId })

		if (!content || content.length === 0) {
			res
				.status(StatusCode.NotFound)
				.json({ message: "No contents found for this tag" });
			return;
		}

		res.status(StatusCode.OK).json({
			sucess: true,
			content,
			tag
		}); // Return contents with the tag
	} catch (error) {
		console.error("Error fetching contents by tag:", error);
		res
			.status(StatusCode.SeverError)
			.json({ message: "Error fetching contents", error });
	}
};

export const createContent = async (req: Request, res: Response) => {
	const id = req.userId;
	const { title, type, link, tldr, tags } = req.body;
	try {
		if (!link) {
			res.status(StatusCode.BadRequest).json({
				success: false,
				message: "Link is required",
			});
			return;
		}

		const content = await contentModel.create({
			title,
			type,
			link,
			tldr,
			tags,
			userId: id,
		});

		if (!content) {
			res.status(StatusCode.SeverError).json({
				success: false,
				message: "Error while creating content. Try again",
			});
			return;
		}
		res.status(StatusCode.OK).json({
			success: true,
			message: "Content Created successfully",
		});
	} catch (e) {
		res.status(StatusCode.SeverError).json({
			success: false,
			message: "Error while creating content. Try again",
			error: e,
		});
	}
};

export const updateContent = async (req: Request, res: Response) => {
	const { title, type, tldr, tags, contentId } = req.body;
	try {
		if (!contentId) {
			res.status(StatusCode.BadRequest).json({
				success: false,
				message: "Content Id is not found",
			});
			return;
		}

		const updateFields: Record<string, string> = {};
		if (title) updateFields.title = title;
		if (type) updateFields.type = type;
		if (tldr) updateFields.tldr = tldr;
		if (tags) updateFields.tags = tags;

		const contentUpdation = await contentModel.findOneAndUpdate(
			{ _id: contentId, userId: req.userId },
			updateFields,
			{ new: true }
		);
		if (!contentUpdation) {
			res.status(StatusCode.BadRequest).json({
				success: false,
				message: "Incorrect Content ID or content does not exist",
			});
			return;
		}
		res.status(StatusCode.OK).json({
			success: true,
			message: "Content Updated Successfully",
			updatedContent: contentUpdation,
		});
	} catch (e) {
		res.status(StatusCode.SeverError).json({
			success: false,
			message: "Error while updating Content",
			error: e,
		});
	}
};

export const deleteContent = async (req: Request, res: Response) => {
	const contentId = req.params.id;
	if (!contentId) {
		res.status(StatusCode.BadRequest).json({
			success: false,
			message: "Content ID not found",
		});
	}
	try {
		const contentDeletion = await contentModel.deleteOne({
			_id: contentId,
			userId: req.userId,
		});

		if (!contentDeletion) {
			res.status(StatusCode.SeverError).json({
				success: false,
				message: "Error while deleting content. Try Again",
			});
			return;
		}
		console.log(contentDeletion);
		res.status(StatusCode.OK).json({
			success: true,
			message: "Content deleted successfully",
		});
	} catch (e) {
		res.status(StatusCode.SeverError).json({
			success: false,
			message: "Incorrect Content ID or Content doesn't exists",
			error: e,
		});
	}
};

export const searchContents = async (req : Request, res : Response) => {
	const { searchQuery } = req.query;

	if (!searchQuery) {
		res.status(StatusCode.BadRequest).json({ message: "Search query is required" });
		return;
	}

	try {
		const searchResults = await contentModel.aggregate([
			{
				$lookup: {
					from: "tags",
					localField: "tags",
					foreignField: "_id",
					as: "tagDetails"
				},
			},
			{
				$match: {
					$or: [
						{ title: { $regex: searchQuery, $options: "i" } },
						{ tldr: { $regex: searchQuery, $options: "i" } },
						{ "tagDetails.tagName": { $regex: searchQuery, $options: "i" } },
					]
				}
			},
			{
				$project: {
					title: 1,
					tldr: 1,
					link: 1,
					tags: 1,
					tagDetails: 1
				}
			}
		])

		res.status(StatusCode.OK).json({
			success: true,
			searchResults
		})
	}
	catch(e) {
		res.status(StatusCode.SeverError).json({ success: false, message: "Internal server error" });
	}
}