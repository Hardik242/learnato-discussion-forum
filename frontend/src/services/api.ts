import type {
    AuthResponse,
    PostsResponse,
    PostResponse,
    MessageResponse,
} from "@/types";

const API_BASE_URL =
    import.meta.env.VITE_APP_BACKEND_URL || "http://localhost:5000/api";

// Helper function to handle API responses
async function handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
        const error = await response
            .json()
            .catch(() => ({message: "An error occurred"}));
        throw new Error(
            error.message || `HTTP error! status: ${response.status}`
        );
    }
    return response.json();
}

// Auth API calls
export const authApi = {
    register: async (
        username: string,
        password: string
    ): Promise<AuthResponse> => {
        const response = await fetch(`${API_BASE_URL}/users/register`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            credentials: "include",
            body: JSON.stringify({username, password}),
        });
        return handleResponse<AuthResponse>(response);
    },

    login: async (
        username: string,
        password: string
    ): Promise<AuthResponse> => {
        const response = await fetch(`${API_BASE_URL}/users/login`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            credentials: "include",
            body: JSON.stringify({username, password}),
        });
        return handleResponse<AuthResponse>(response);
    },

    logout: async (): Promise<MessageResponse> => {
        const response = await fetch(`${API_BASE_URL}/users/logout`, {
            method: "POST",
            credentials: "include",
        });
        return handleResponse<MessageResponse>(response);
    },

    getCurrentUser: async (): Promise<AuthResponse> => {
        const response = await fetch(`${API_BASE_URL}/users/me`, {
            credentials: "include",
        });
        return handleResponse<AuthResponse>(response);
    },
};

// Posts API calls
export const postsApi = {
    getAllPosts: async (
        sortBy: "date" | "votes" = "date"
    ): Promise<PostsResponse> => {
        const response = await fetch(`${API_BASE_URL}/posts?sort=${sortBy}`, {
            credentials: "include",
        });
        return handleResponse<PostsResponse>(response);
    },

    getPost: async (id: string): Promise<PostResponse> => {
        const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
            credentials: "include",
        });
        return handleResponse<PostResponse>(response);
    },

    createPost: async (
        title: string,
        content: string
    ): Promise<PostResponse> => {
        const response = await fetch(`${API_BASE_URL}/posts`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            credentials: "include",
            body: JSON.stringify({title, content}),
        });
        return handleResponse<PostResponse>(response);
    },

    addReply: async (
        postId: string,
        content: string
    ): Promise<PostResponse> => {
        const response = await fetch(`${API_BASE_URL}/posts/${postId}/reply`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            credentials: "include",
            body: JSON.stringify({content}),
        });
        return handleResponse<PostResponse>(response);
    },

    upvotePost: async (postId: string): Promise<PostResponse> => {
        const response = await fetch(`${API_BASE_URL}/posts/${postId}/upvote`, {
            method: "POST",
            credentials: "include",
        });
        return handleResponse<PostResponse>(response);
    },
};
