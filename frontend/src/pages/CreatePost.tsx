import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useCreatePost } from '@/hooks/usePosts';
import { useAuth } from '@/hooks/useAuth';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();
  const createPostMutation = useCreatePost();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    createPostMutation.mutate(
      { title: title.trim(), content: content.trim() },
      {
        onSuccess: () => {
          navigate('/');
        },
      }
    );
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Layout>
      <div className="max-w-3xl mx-auto space-y-6">
        <Link to="/">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </Link>

        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Create a New Post</h1>
          <p className="text-muted-foreground">
            Share your question or start a discussion with the community
          </p>
        </div>

        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                type="text"
                placeholder="What's your question or topic?"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={createPostMutation.isPending}
                required
                maxLength={200}
              />
              <p className="text-xs text-muted-foreground">
                {title.length}/200 characters
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                placeholder="Provide more details about your question or topic..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                disabled={createPostMutation.isPending}
                required
                className="min-h-[200px] resize-none"
                maxLength={5000}
              />
              <p className="text-xs text-muted-foreground">
                {content.length}/5000 characters
              </p>
            </div>

            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/')}
                disabled={createPostMutation.isPending}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={!title.trim() || !content.trim() || createPostMutation.isPending}
              >
                {createPostMutation.isPending ? 'Creating...' : 'Create Post'}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </Layout>
  );
}
