"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { addBlogs, AddBlogFormValues } from "@/lib/zodValidations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useState } from "react";
import useAuthStore from "@/store/authStore/authStore";
import useBlogStore from "@/store/blogStore/blogStore";
import Image from "next/image";
import { MdDeleteForever } from "react-icons/md";
import "react-quill/dist/quill.snow.css";
import { FaEdit } from "react-icons/fa";
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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import useCommentStore from "@/store/commentStore/commentStore";
import useFavBlogStore from "@/store/favoriteStore/favoriteStore";
import TiptapEditor from "@/components/tiptap/Tiptap";
import Link from "next/link";

const AddBlog = () => {
  const { user } = useAuthStore((ele) => ele);
  const { addBlog, blogs, removeBlog, updateBlog } = useBlogStore((ele) => ele);
  const { removeCommentsByBlogId } = useCommentStore((ele) => ele);
  const { removeFav } = useFavBlogStore((ele) => ele);

  const form = useForm<AddBlogFormValues>({
    resolver: zodResolver(addBlogs),
    defaultValues: {
      title: "",
      content: "",
      image: "",
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editData, setEditData] = useState<AddBlogFormValues>({
    title: "",
    content: "",
    image: "",
  });
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleSubmit = (values: AddBlogFormValues) => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    const blogWithId = {
      ...values,
      id: crypto.randomUUID(),
      auther: user?.username || "Unknown",
      date: new Date().toISOString(),
    };

    addBlog(blogWithId);
    toast.success("Blog post added successfully!");
    form.reset();
    setTimeout(() => setIsSubmitting(false), 500);
  };

  const deleteBlog = (id: string) => {
    removeBlog(id);
    removeCommentsByBlogId(id);
    removeFav(id);
    toast.success("Blog post removed successfully!");
  };

  if (!user) return <div className="text-center py-10">User Not <Link href="/login" className="text-blue-500 underline">Logged In</Link></div>;

  const userBlogs = blogs.filter((blog) => blog.auther === user.username);

  return (
    <div className="min-h-screen bg-muted px-4 py-10">
      <div className="max-w-2xl mx-auto mb-12">
        <Card>
          <CardHeader>
            <CardTitle className="text-center text-2xl">
              Add a New Blog Post
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-5"
              >
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter blog title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center gap-1">
                        <FormLabel>Content</FormLabel>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className="text-muted-foreground cursor-help text-sm">
                              🛈
                            </span>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Write your blog content with rich formatting.</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      <FormControl>
                        <TiptapEditor
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image URL</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://..."
                          type="url"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Adding..." : "Add Blog"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>

      {/* Blog Cards */}
      {userBlogs.length > 0 && (
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl font-semibold text-center mb-6 text-gray-800">
            Your Blog Posts
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userBlogs.map((blog) => (
              <Card key={blog.id} className="flex flex-col justify-between p-0">
                <CardHeader className="p-0">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    width={400}
                    height={250}
                    className="rounded-t-lg object-cover h-48 w-full"
                  />
                </CardHeader>
                <CardContent className="p-4 space-y-2">
                  <h4 className="font-semibold text-lg">{blog.title}</h4>
                  <div
                    className="prose prose-slate dark:prose-invert lg:prose-lg max-w-none text-foreground/90"
                    dangerouslySetInnerHTML={{
                      __html:
                        blog.content || "<p>No article content available.</p>",
                    }}
                  ></div>
                  <div className="flex justify-end gap-3 mt-4 items-center">
                    {/* Edit Dialog */}
                    <Dialog>
                      <DialogTrigger asChild>
                        <FaEdit
                          className="text-xl cursor-pointer"
                          onClick={() => {
                            setEditingId(blog.id);
                            setEditData({
                              title: blog.title,
                              content: blog.content,
                              image: blog.image,
                            });
                          }}
                        />
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl h-[600px] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Edit Blog</DialogTitle>
                          <DialogDescription>
                            Make changes to your blog post.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="edit-title">Title</Label>
                            <Input
                              id="edit-title"
                              value={editData.title}
                              onChange={(e) =>
                                setEditData({
                                  ...editData,
                                  title: e.target.value,
                                })
                              }
                            />
                          </div>

                          <div>
                            <Label htmlFor="edit-content">Content</Label>
                            <div className="mt-1">
                              <TiptapEditor
                                value={editData.content}
                                onChange={(content) =>
                                  setEditData({
                                    ...editData,
                                    content: content,
                                  })
                                }
                              />
                            </div>
                          </div>

                          <div>
                            <Label htmlFor="edit-image">Image URL</Label>
                            <Input
                              id="edit-image"
                              value={editData.image}
                              onChange={(e) =>
                                setEditData({
                                  ...editData,
                                  image: e.target.value,
                                })
                              }
                            />
                          </div>
                        </div>
                        <DialogFooter className="mt-4">
                          <Button
                            onClick={() => {
                              if (editingId) {
                                updateBlog(editingId, {
                                  ...editData,
                                  id: editingId,
                                  auther: blog.auther,
                                  date: blog.date,
                                });
                                toast.success("Blog updated successfully!");
                              }
                            }}
                          >
                            Save changes
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>

                    {/* Delete Confirmation */}
                    <AlertDialog>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="destructive"
                              size="icon"
                              className="cursor-pointer"
                            >
                              <MdDeleteForever className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Delete Blog</p>
                        </TooltipContent>
                      </Tooltip>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action will permanently delete this blog post.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => deleteBlog(blog.id)}
                            className="bg-destructive text-white hover:bg-destructive/90"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AddBlog;
