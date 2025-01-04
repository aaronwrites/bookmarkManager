import { Schema, model, mongo } from "mongoose";
const ObjectId = Schema.ObjectId;

const userSchema = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true}
})

const contentTypes = ["X", "youtube", "website", "others"]

const contentSchema = new Schema({
    title: {type: String, required: true},
    type: {type: String, enum: contentTypes, required: true },
    link: {type: String, required: true},
    tags: [{type: ObjectId, ref: "Tags"}],
    userId: {type: ObjectId, ref: "Users", required: true}
})

const tagsSchema = new Schema({
    tagName: {type: String, required: true, unique: true}
})

const shareLinkSchema = new Schema({
    hash: {type: String, required: true},
    userId: {type: ObjectId, ref: "Users"}
})

export const userModel = model("Users", userSchema);
export const contentModel = model("Contents", contentSchema);
export const tagsModel = model("Tags", tagsSchema);
export const shareLinkModel = model("ShareLink", shareLinkSchema);