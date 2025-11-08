import {useParams, Link} from "react-router-dom";
import {Layout} from "@/components/layout/Layout";
import {usePost} from "@/hooks/usePosts";
import {VoteButton} from "@/components/forum/VoteButton";
import {ReplyCard} from "@/components/forum/ReplyCard";
import {ReplyForm} from "@/components/forum/ReplyForm";
import {useAuth} from "@/hooks/useAuth";
import {useUpvotePost} from "@/hooks/usePosts";
import {User, Clock, MessageSquare, ArrowLeft} from "lucide-react";
import {formatDistanceToNow} from "date-fns";
import {Skeleton} from "@/components/ui/skeleton";
import {Button} from "@/components/ui/button";
import {Card} from "@/components/ui/card";
import {Separator} from "@/components/ui/separator";

export default function PostDetail() {
    const {id} = useParams<{id: string}>();
    const {user, isAuthenticated} = useAuth();
    const {data, isLoading} = usePost(id!);
    const upvoteMutation = useUpvotePost();

    if (isLoading) {
        return (
            <Layout>
                <div className="max-w-4xl mx-auto space-y-6">
                    <Skeleton className="h-8 w-32" />
                    <Skeleton className="h-64 w-full" />
                    <Skeleton className="h-40 w-full" />
                </div>
            </Layout>
        );
    }

    if (!data) {
        return (
            <Layout>
                <div className="max-w-4xl mx-auto text-center py-12">
                    <h2 className="text-2xl font-bold mb-4">Post not found</h2>
                    <Link to="/">
                        <Button variant="outline">Go back home</Button>
                    </Link>
                </div>
            </Layout>
        );
    }

    const post = data;
    const isVoted = user ? post.voters.includes(user._id) : false;

    const handleVote = () => {
        if (!isAuthenticated) return;
        upvoteMutation.mutate(post._id);
    };

    return (
        <Layout>
            <div className="max-w-4xl mx-auto space-y-6">
                {/* Back button */}
                <Link to="/">
                    <Button variant="ghost" className="gap-2">
                        <ArrowLeft className="h-4 w-4" />
                        Back to discussions
                    </Button>
                </Link>

                {/* Post Content */}
                <Card className="p-6">
                    <div className="flex gap-6">
                        <VoteButton
                            votes={post.votes}
                            isVoted={isVoted}
                            onVote={handleVote}
                            disabled={
                                !isAuthenticated || upvoteMutation.isPending
                            }
                        />

                        <div className="flex-1 min-w-0 space-y-4">
                            <div>
                                <h1 className="text-3xl font-bold mb-4">
                                    {post.title}
                                </h1>

                                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                                    <div className="flex items-center gap-2">
                                        <User className="h-4 w-4" />
                                        <span className="font-medium">
                                            {post.authorUsername}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Clock className="h-4 w-4" />
                                        <span>
                                            {formatDistanceToNow(
                                                new Date(post.createdAt),
                                                {addSuffix: true}
                                            )}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <MessageSquare className="h-4 w-4" />
                                        <span>
                                            {post.replies.length}{" "}
                                            {post.replies.length === 1
                                                ? "reply"
                                                : "replies"}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <Separator />

                            <div className="prose prose-sm max-w-none">
                                <p className="whitespace-pre-wrap break-words">
                                    {post.content}
                                </p>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Replies Section */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <MessageSquare className="h-6 w-6" />
                        {post.replies.length}{" "}
                        {post.replies.length === 1 ? "Reply" : "Replies"}
                    </h2>

                    {post.replies.length > 0 && (
                        <div className="space-y-3">
                            {post.replies.map((reply) => (
                                <ReplyCard key={reply._id} reply={reply} />
                            ))}
                        </div>
                    )}

                    {/* Reply Form */}
                    {isAuthenticated ? (
                        <Card className="p-6">
                            <h3 className="text-lg font-semibold mb-4">
                                Add your reply
                            </h3>
                            <ReplyForm postId={post._id} />
                        </Card>
                    ) : (
                        <Card className="p-6 text-center">
                            <p className="text-muted-foreground mb-4">
                                Sign in to join the discussion
                            </p>
                            <Link to="/auth">
                                <Button>Sign In</Button>
                            </Link>
                        </Card>
                    )}
                </div>
            </div>
        </Layout>
    );
}
