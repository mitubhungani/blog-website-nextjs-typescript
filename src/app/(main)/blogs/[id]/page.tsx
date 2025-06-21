"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { MdDeleteForever, MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { BiSolidCommentDetail } from "react-icons/bi";
import { toast } from "sonner";

import useBlogStore from "@/store/blogStore/blogStore";
import useAuthStore from "@/store/authStore/authStore";
import useFavBlogStore from "@/store/favoriteStore/favoriteStore";
import useCommentStore from "@/store/commentStore/commentStore";

import { BlogType, CommentType, FavoriteType } from "@/type";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Skeletone from "@/components/skeleton/page";
import Head from "next/head";

const BlogIdPage = () => {
  const { id } = useParams();
  const { blogs } = useBlogStore();
  const { user } = useAuthStore();
  const { addFavBlog, removeFav, isFavorite } = useFavBlogStore();
  const { addComment, comments, removeComment } = useCommentStore();

  const [blog, setBlog] = useState<BlogType | null>(null);
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isCommentDialogOpen, setIsCommentDialogOpen] = useState(false);

  const blogComments = comments.filter((c) => c.blogid === id);

  useEffect(() => {
    setIsLoading(true);
    const selected = blogs.find((b) => b.id === id);
    if (selected) {
      const fav = user ? isFavorite(selected.id, user.username) : false;
      setBlog({ ...selected, isFavorite: fav });
    } else {
      setBlog(null);
    }
    setIsLoading(false);
  }, [blogs, id, user, isFavorite]);

  const toggleFavorite = () => {
    if (!blog || !user) {
      toast.error("Please log in to favorite posts.");
      return;
    }

    const isFav = isFavorite(blog.id, user.username);
    if (isFav) {
      removeFav(blog.id);
      toast.success("Removed from favorites");
      setBlog((prev) => (prev ? { ...prev, isFavorite: false } : null));
    } else {
      const newFav: FavoriteType = {
        id: crypto.randomUUID(),
        blogid: blog.id,
        username: user.username,
        image: blog.image,
        title: blog.title,
        content: blog.content,
        auther: blog.auther,
        date: blog.date,
      };
      addFavBlog(newFav);
      toast.success("Added to favorites");
      setBlog((prev) => (prev ? { ...prev, isFavorite: true } : null));
    }
  };

  const handleAddComment = () => {
    if (!blog || !user) {
      toast.error("Please log in to comment.");
      return;
    }
    if (!comment.trim()) {
      toast.error("Comment cannot be empty.");
      return;
    }

    const newComment: CommentType = {
      id: crypto.randomUUID(),
      blogid: blog.id,
      username: user.username,
      content: comment.trim(),
      date: new Date().toISOString(),
    };

    addComment(newComment);
    toast.success("Comment added successfully");
    setComment("");
    setIsCommentDialogOpen(false);
  };

  const handleDeleteComment = (commentId: string) => {
    removeComment(commentId);
    toast.success("Comment deleted");
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 min-h-screen">
        <Skeletone />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center px-4">
        <div>
          <h1 className="text-2xl font-semibold text-destructive mb-4">
            Blog Post Not Found
          </h1>
          <p className="text-muted-foreground">
            The blog post you are looking for does not exist or may have been
            removed.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        {/* <meta name="keywords" content={blog.id} /> */}
        <title>{blog.title} | My Blog</title>
        <meta name="title" content={blog.title} />
        <meta name="description" content={blog.content.slice(0, 80)} />
      </Head>
      
      <TooltipProvider delayDuration={100}>
        <div className="container bg-white mx-auto px-4 py-8 min-h-screen flex flex-col items-center ">
          <div className="w-full max-w-3xl">
            <Card className="mb-12  border-0 overflow-hidden p-0">
              <CardHeader className="p-0">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  width={1200}
                  height={600}
                  className="w-full h-72 md:h-96 object-cover"
                  priority
                />
              </CardHeader>
              <CardContent className="p-6 md:p-8 space-y-6">
                <h1
                  className="text-4xl font-serif italic font-bold tracking-tight"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: 700,
                  }}
                >
                  {/* {comment.username?.charAt(0).toUpperCase()} */}
                  {blog.title.charAt(0).toUpperCase()}
                  {blog.title.slice(1).toLowerCase()}
                </h1>

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b pb-4">
                  <div>
                    <p className="text-lg font-medium text-foreground">
                      By {blog.auther}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Published on{" "}
                      {new Date(blog.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={toggleFavorite}
                          aria-label={
                            blog.isFavorite
                              ? "Remove from favorites"
                              : "Add to favorites"
                          }
                          className="text-red-500 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-full cursor-pointer"
                        >
                          {blog.isFavorite ? (
                            <MdFavorite className="h-6 w-6" />
                          ) : (
                            <MdFavoriteBorder className="h-6 w-6" />
                          )}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>
                          {blog.isFavorite
                            ? "Remove from favorites"
                            : "Add to favorites"}
                        </p>
                      </TooltipContent>
                    </Tooltip>

                    <Dialog
                      open={isCommentDialogOpen}
                      onOpenChange={setIsCommentDialogOpen}
                    >
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <DialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              aria-label="Add comment"
                              className="text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-900/20 rounded-full cursor-pointer"
                            >
                              <BiSolidCommentDetail className="h-6 w-6" />
                            </Button>
                          </DialogTrigger>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Add a Comment</p>
                        </TooltipContent>
                      </Tooltip>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Add Your Comment</DialogTitle>
                          <DialogDescription>
                            Share your thoughts on {blog.title}. Click post when
                            youre done.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid w-full gap-1.5">
                            <Label htmlFor="comment">Your Comment</Label>
                            <Textarea
                              id="comment"
                              value={comment}
                              onChange={(e) => setComment(e.target.value)}
                              placeholder="Type your comment here..."
                              rows={4}
                              className="resize-none"
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button type="button" variant="outline">
                              Cancel
                            </Button>
                          </DialogClose>
                          <Button
                            type="button"
                            onClick={handleAddComment}
                            disabled={!comment.trim()}
                          >
                            Post Comment
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>

                <div
                  className="prose prose-slate dark:prose-invert lg:prose-lg max-w-none text-foreground/90"
                  dangerouslySetInnerHTML={{
                    __html:
                      blog.content || "<p>No article content available.</p>",
                  }}
                >
                  {/* {blog.content} */}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold">
                  Comments ({blogComments.length})
                </CardTitle>
                <CardDescription>See what others are saying.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {blogComments.length > 0 ? (
                  blogComments.map((comment) => (
                    <div
                      key={comment.id}
                      className="flex gap-4 border-b pb-4 last:border-b-0 last:pb-0"
                    >
                      <Avatar className="h-10 w-10 border">
                        <AvatarFallback className="bg-primary/10 text-primary font-medium">
                          {comment.username?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-1.5">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-semibold text-foreground">
                              {comment.username}
                            </p>
                            <span className="text-xs text-muted-foreground">
                              ·{" "}
                              {new Date(comment.date).toLocaleString("en-US", {
                                dateStyle: "short",
                                timeStyle: "short",
                              })}
                            </span>
                          </div>
                          {comment.username === user?.username && (
                            <AlertDialog>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <AlertDialogTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-7 w-7 text-destructive/70 hover:text-destructive hover:bg-destructive/10 rounded-full"
                                    >
                                      <MdDeleteForever className="h-4 w-4" />
                                    </Button>
                                  </AlertDialogTrigger>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Delete Comment</p>
                                </TooltipContent>
                              </Tooltip>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Are you sure?
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This will permanently delete your comment.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() =>
                                      handleDeleteComment(comment.id)
                                    }
                                    className="bg-destructive hover:bg-destructive/90"
                                  >
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          )}
                        </div>
                        <p className="text-sm text-foreground/80 whitespace-pre-wrap">
                          {comment.content}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground italic text-center py-4">
                    Be the first to share your thoughts!
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </TooltipProvider>
    </>
  );
};

export default BlogIdPage;
