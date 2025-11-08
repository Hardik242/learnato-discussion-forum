import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useAddReply } from '@/hooks/usePosts';

interface ReplyFormProps {
  postId: string;
}

export function ReplyForm({ postId }: ReplyFormProps) {
  const [content, setContent] = useState('');
  const addReplyMutation = useAddReply();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    addReplyMutation.mutate(
      { postId, content },
      {
        onSuccess: () => {
          setContent('');
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Textarea
        placeholder="Write your reply..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="min-h-[100px] resize-none"
        disabled={addReplyMutation.isPending}
      />
      <div className="flex justify-end">
        <Button 
          type="submit" 
          disabled={!content.trim() || addReplyMutation.isPending}
        >
          {addReplyMutation.isPending ? 'Posting...' : 'Post Reply'}
        </Button>
      </div>
    </form>
  );
}
