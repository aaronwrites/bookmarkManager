"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shareLinkModel = exports.tagsModel = exports.contentModel = exports.userModel = void 0;
const mongoose_1 = require("mongoose");
const ObjectId = mongoose_1.Schema.ObjectId;
const userSchema = new mongoose_1.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
const contentTypes = ["X", "youtube", "website", "others"];
const contentSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    type: { type: String, enum: contentTypes, required: true },
    link: { type: String, required: true },
    tags: [{ type: ObjectId, ref: "Tags" }],
    userId: { type: ObjectId, ref: "Users", required: true }
});
const tagsSchema = new mongoose_1.Schema({
    tagName: { type: String, required: true, unique: true }
});
const shareLinkSchema = new mongoose_1.Schema({
    hash: { type: String, required: true },
    userId: { type: ObjectId, ref: "Users" }
});
exports.userModel = (0, mongoose_1.model)("Users", userSchema);
exports.contentModel = (0, mongoose_1.model)("Contents", contentSchema);
exports.tagsModel = (0, mongoose_1.model)("Tags", tagsSchema);
exports.shareLinkModel = (0, mongoose_1.model)("ShareLink", shareLinkSchema);
