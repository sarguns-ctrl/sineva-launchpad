import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Eye, Clock, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { BlogForm } from './BlogForm';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  category?: string;
  tags: string[];
  is_published: boolean;
  is_featured: boolean;
  published_at?: string;
  created_at: string;
  updated_at: string;
}

export const BlogManagement: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      toast({
        title: "Error",
        description: "Failed to fetch blog posts",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePublishToggle = async (postId: string, isPublished: boolean) => {
    try {
      const updateData: any = { is_published: !isPublished };
      if (!isPublished) {
        updateData.published_at = new Date().toISOString();
      } else {
        updateData.published_at = null;
      }

      const { error } = await supabase
        .from('blog_posts')
        .update(updateData)
        .eq('id', postId);

      if (error) throw error;

      setPosts(prev => prev.map(p => 
        p.id === postId 
          ? { ...p, is_published: !isPublished, published_at: updateData.published_at }
          : p
      ));

      toast({
        title: "Success",
        description: `Post ${!isPublished ? 'published' : 'unpublished'} successfully`,
      });
    } catch (error) {
      console.error('Error updating post status:', error);
      toast({
        title: "Error",
        description: "Failed to update post status",
        variant: "destructive",
      });
    }
  };

  const handleFeaturedToggle = async (postId: string, isFeatured: boolean) => {
    try {
      const { error } = await supabase
        .from('blog_posts')
        .update({ is_featured: !isFeatured })
        .eq('id', postId);

      if (error) throw error;

      setPosts(prev => prev.map(p => 
        p.id === postId ? { ...p, is_featured: !isFeatured } : p
      ));

      toast({
        title: "Success",
        description: `Post ${!isFeatured ? 'featured' : 'unfeatured'} successfully`,
      });
    } catch (error) {
      console.error('Error updating featured status:', error);
      toast({
        title: "Error",
        description: "Failed to update featured status",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (postId: string) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return;

    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', postId);

      if (error) throw error;

      setPosts(prev => prev.filter(p => p.id !== postId));
      toast({
        title: "Success",
        description: "Blog post deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting blog post:', error);
      toast({
        title: "Error",
        description: "Failed to delete blog post",
        variant: "destructive",
      });
    }
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (post.category?.toLowerCase().includes(searchTerm.toLowerCase()));
    
    let matchesStatus = true;
    if (statusFilter === 'published') matchesStatus = post.is_published;
    else if (statusFilter === 'draft') matchesStatus = !post.is_published;
    else if (statusFilter === 'featured') matchesStatus = post.is_featured;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (post: BlogPost) => {
    if (post.is_published) {
      return <Badge className="bg-green-500">Published</Badge>;
    }
    return <Badge variant="secondary">Draft</Badge>;
  };

  if (loading) {
    return <div className="flex justify-center p-8">Loading blog posts...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Blog Management</h2>
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setSelectedPost(null)}>
              <Plus className="h-4 w-4 mr-2" />
              New Blog Post
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {selectedPost ? 'Edit Blog Post' : 'Create New Blog Post'}
              </DialogTitle>
            </DialogHeader>
            <BlogForm
              post={selectedPost}
              onSuccess={() => {
                setIsFormOpen(false);
                setSelectedPost(null);
                fetchPosts();
              }}
              onCancel={() => {
                setIsFormOpen(false);
                setSelectedPost(null);
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex gap-4 mb-6">
        <Input
          placeholder="Search blog posts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Posts</SelectItem>
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="featured">Featured</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4">
        {filteredPosts.map((post) => (
          <Card key={post.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-semibold">{post.title}</h3>
                    {post.is_featured && (
                      <Badge variant="outline" className="text-primary border-primary">
                        Featured
                      </Badge>
                    )}
                    {getStatusBadge(post)}
                  </div>
                  
                  {post.excerpt && (
                    <p className="text-muted-foreground mb-2 line-clamp-2">
                      {post.excerpt}
                    </p>
                  )}
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    {post.category && <span>{post.category}</span>}
                    {post.tags && post.tags.length > 0 && (
                      <>
                        {post.category && <span>•</span>}
                        <span>{post.tags.join(', ')}</span>
                      </>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mt-2">
                    <span>Created: {new Date(post.created_at).toLocaleDateString()}</span>
                    {post.published_at && (
                      <span>Published: {new Date(post.published_at).toLocaleDateString()}</span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant={post.is_published ? "default" : "outline"}
                    size="sm"
                    onClick={() => handlePublishToggle(post.id, post.is_published)}
                  >
                    {post.is_published ? (
                      <Eye className="h-4 w-4" />
                    ) : (
                      <CheckCircle className="h-4 w-4" />
                    )}
                  </Button>
                  
                  <Button
                    variant={post.is_featured ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleFeaturedToggle(post.id, post.is_featured)}
                  >
                    ⭐
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedPost(post);
                      setIsFormOpen(true);
                    }}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(post.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredPosts.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <p className="text-muted-foreground">No blog posts found</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};