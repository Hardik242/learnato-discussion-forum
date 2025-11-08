import {Schema, model, Document, Types} from "mongoose";

interface IReply extends Document {
    user: Types.ObjectId;
    authorUsername: string;
    content: string;
    createdAt: Date;
}

interface IPost extends Document {
    user: Types.ObjectId;
    authorUsername: string;
    title: string;
    content: string;
    votes: number;
    voters: Types.ObjectId[];
    replies: IReply[];
    createdAt: Date;
}

const ReplySchema = new Schema<IReply>({
    user: {type: Schema.Types.ObjectId, required: true, ref: "User"},
    authorUsername: {type: String, required: true},
    content: {type: String, required: true, trim: true},
    createdAt: {type: Date, default: Date.now},
});

const PostSchema = new Schema<IPost>({
    user: {type: Schema.Types.ObjectId, required: true, ref: "User"},
    authorUsername: {type: String, required: true},
    title: {type: String, required: true, trim: true},
    content: {type: String, required: true, trim: true},
    votes: {type: Number, default: 0},
    voters: [{type: Schema.Types.ObjectId, ref: "User"}],
    replies: [ReplySchema],
    createdAt: {type: Date, default: Date.now},
});

const Post = model<IPost>("Post", PostSchema);

export {Post, IPost, IReply};
