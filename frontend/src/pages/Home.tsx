import {PostList} from "@/components/forum/PostList";
import {Layout} from "@/components/layout/Layout";
import {Input} from "@/components/ui/input";
import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {usePosts} from "@/hooks/usePosts";
import {Clock, Search, TrendingUp} from "lucide-react";
import {useState} from "react";

export default function Home() {
    const [sortBy, setSortBy] = useState<"date" | "votes">("date");
    const [searchQuery, setSearchQuery] = useState("");
    const {data, isLoading} = usePosts(sortBy);

    const posts = data || [];

    // Filter posts based on search query
    const filteredPosts = posts.filter(
        (post) =>
            post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.content.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Layout>
            <div className="max-w-4xl mx-auto space-y-6">
                {/* Header */}
                <div className="space-y-2">
                    <h1 className="text-4xl font-bold tracking-tight">
                        Discussion Forum
                    </h1>
                    <p className="text-muted-foreground text-lg">
                        Empower learning through conversation
                    </p>
                </div>

                {/* Search and Sort Controls */}
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                    <div className="relative flex-1 w-full sm:max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="text"
                            placeholder="Search discussions..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-9"
                        />
                    </div>

                    <Tabs
                        value={sortBy}
                        onValueChange={(v) => setSortBy(v as "date" | "votes")}>
                        <TabsList>
                            <TabsTrigger value="date" className="gap-2">
                                <Clock className="h-4 w-4" />
                                Recent
                            </TabsTrigger>
                            <TabsTrigger value="votes" className="gap-2">
                                <TrendingUp className="h-4 w-4" />
                                Top
                            </TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>

                {/* Posts List */}
                {searchQuery && (
                    <p className="text-sm text-muted-foreground">
                        Found {filteredPosts.length}{" "}
                        {filteredPosts.length === 1 ? "result" : "results"}
                    </p>
                )}

                <PostList posts={filteredPosts} isLoading={isLoading} />
            </div>
        </Layout>
    );
}
