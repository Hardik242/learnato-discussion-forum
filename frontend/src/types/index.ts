export interface User {
    _id: string;
    username: string;
}

export interface Reply {
    _id: string;
    user: User;
    content: string;
    authorUsername: string;
    createdAt: string;
}

export interface Post {
    _id: string;
    user: User;
    title: string;
    content: string;
    authorUsername: string;
    votes: number;
    voters: string[];
    replies: Reply[];
    createdAt: string;
}

export type AuthResponse = User;

export type PostsResponse = Post[];

export type PostResponse = Post;

export interface MessageResponse {
    message: string;
}
