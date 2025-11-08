import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { VoteButton } from './VoteButton';
import { MessageSquare, User, Clock } from 'lucide-react';
import { Post } from '@/types';
import { useUpvotePost } from '@/hooks/usePosts';
import { useAuth } from '@/hooks/useAuth';
import { formatDistanceToNow } from 'date-fns';

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const { user, isAuthenticated } = useAuth();
  const upvoteMutation = useUpvotePost();

  const isVoted = user ? post.voters.includes(user._id) : false;

  const handleVote = () => {
    if (!isAuthenticated) {
      return;
    }
    upvoteMutation.mutate(post._id);
  };

  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <div className="flex gap-4">
        <VoteButton
          votes={post.votes}
          isVoted={isVoted}
          onVote={handleVote}
          disabled={!isAuthenticated || upvoteMutation.isPending}
        />
        
        <div className="flex-1 min-w-0">
          <Link to={`/post/${post._id}`}>
            <h3 className="font-semibold text-lg mb-2 hover:text-primary transition-colors line-clamp-2">
              {post.title}
            </h3>
          </Link>
          
          <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
            {post.content}
          </p>
          
          <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <User className="h-3 w-3" />
              <span>{post.authorUsername}</span>
            </div>
            
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}</span>
            </div>
            
            <Link 
              to={`/post/${post._id}`}
              className="flex items-center gap-1 hover:text-primary transition-colors"
            >
              <MessageSquare className="h-3 w-3" />
              <span>{post.replies.length} {post.replies.length === 1 ? 'reply' : 'replies'}</span>
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
}
