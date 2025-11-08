import {useQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import {authApi} from "@/services/api";
import {useNavigate} from "react-router-dom";
import {toast} from "sonner";

export function useAuth() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    // Get current user
    const {data: currentUser, isLoading} = useQuery({
        queryKey: ["currentUser"],
        queryFn: () => authApi.getCurrentUser(),
        retry: false,
        staleTime: 5 * 60 * 1000, // 5 minutes
        refetchOnWindowFocus: false,
    });

    // Register mutation
    const registerMutation = useMutation({
        mutationFn: ({
            username,
            password,
        }: {
            username: string;
            password: string;
        }) => authApi.register(username, password),
        onSuccess: (data) => {
            queryClient.setQueryData(["currentUser"], data);
            toast.success("Account created successfully!");
            navigate("/");
        },
        onError: (error: Error) => {
            toast.error(error.message || "Failed to create account");
        },
    });

    // Login mutation
    const loginMutation = useMutation({
        mutationFn: ({
            username,
            password,
        }: {
            username: string;
            password: string;
        }) => authApi.login(username, password),
        onSuccess: (data) => {
            queryClient.setQueryData(["currentUser"], data);
            toast.success("Logged in successfully!");
            navigate("/");
        },
        onError: (error: Error) => {
            toast.error(error.message || "Failed to login");
        },
    });

    // Logout mutation
    const logoutMutation = useMutation({
        mutationFn: authApi.logout,
        onSuccess: () => {
            queryClient.setQueryData(["currentUser"], null);
            queryClient.clear();
            toast.success("Logged out successfully!");
            navigate("/auth");
        },
        onError: (error: Error) => {
            toast.error(error.message || "Failed to logout");
        },
    });

    return {
        user: currentUser,
        isAuthenticated: !!currentUser,
        isLoading,
        register: registerMutation.mutate,
        login: loginMutation.mutate,
        logout: logoutMutation.mutate,
        isRegistering: registerMutation.isPending,
        isLoggingIn: loginMutation.isPending,
        isLoggingOut: logoutMutation.isPending,
    };
}
