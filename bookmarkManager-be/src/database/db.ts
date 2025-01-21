import { Schema, model, mongo } from "mongoose";
const ObjectId = Schema.ObjectId;

const userSchema = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true}
})


const contentSchema = new Schema({
    title: {type: String},
    type: {type: String},
    link: {type: String, required: true},
    tldr: {type: String},
    tags: [{type: ObjectId, ref: "Tags"}],
    userId: {type: ObjectId, ref: "Users", required: true}
})

const tagsSchema = new Schema({
    tagName: {type: String, unique: true, lowercase: true},
    userId: {type: ObjectId, ref: "Users", required: true}
})

const shareLinkSchema = new Schema({
    hash: {type: String, required: true},
    userId: {type: ObjectId, ref: "Users", required: true}
})

export const userModel = model("Users", userSchema);
export const contentModel = model("Contents", contentSchema);
export const tagsModel = model("Tags", tagsSchema);
export const shareLinkModel = model("ShareLink", shareLinkSchema);