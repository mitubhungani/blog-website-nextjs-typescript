import { z } from "zod";

export const formSchema = z.object({
  username: z.string().min(2, { message: "Username must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

export const loginSchema = z.object({
    email: z.string().email({ message: "Invalid email address." }),
    password: z.string().min(6, { message: "Password must be at least 6 characters." }),
  });

  export const addBlogs = z.object({
    id: z.string().optional(), // ✅ optional now
    title: z.string().min(2, { message: "Title must be at least 2 characters." }),
    content: z.string().min(10, { message: "Content must be at least 10 characters." }),
    image: z.string().url({ message: "Invalid image URL." }),
    auther: z.string().optional(), // ✅ optional now
  });
  
  export const cooments =z.object({
    content: z.string(),
  })


export type SignupFormValues = z.infer<typeof formSchema>;
export type LoginFormValues = z.infer<typeof loginSchema>;
export type AddBlogFormValues = z.infer<typeof addBlogs>;
export type CommentValues = z.infer<typeof cooments>;