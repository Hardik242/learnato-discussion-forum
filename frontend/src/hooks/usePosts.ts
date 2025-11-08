import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { postsApi } from '@/services/api';
import { toast } from 'sonner';

export function usePosts(sortBy: 'date' | 'votes' = 'date') {
  return useQuery({
    queryKey: ['posts', sortBy],
    queryFn: () => postsApi.getAllPosts(sortBy),
    staleTime: 30 * 1000, // 30 seconds
  });
}

export function usePost(postId: string) {
  return useQuery({
    queryKey: ['post', postId],
    queryFn: () => postsApi.getPost(postId),
    enabled: !!postId,
  });
}

export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ title, content }: { title: string; content: string }) =>
      postsApi.createPost(title, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      toast.success('Post created successfully!');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to create post');
    },
  });
}

export function useAddReply() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, content }: { postId: string; content: string }) =>
      postsApi.addReply(postId, content),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['post', variables.postId] });
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      toast.success('Reply added successfully!');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to add reply');
    },
  });
}

export function useUpvotePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId: string) => postsApi.upvotePost(postId),
    onSuccess: (data, postId) => {
      // Update single post view
      queryClient.setQueryData(['post', postId], data);
      // Invalidate posts list to refresh
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to vote');
    },
  });
}
