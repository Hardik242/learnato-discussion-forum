import { PostCard } from './PostCard';
import { Post } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';

interface PostListProps {
  posts: Post[];
  isLoading?: boolean;
}

export function PostList({ posts, isLoading }: PostListProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-40 w-full" />
        ))}
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg">No posts yet. Be the first to start a discussion!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
}
