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
import { LoginFormValues, loginSchema } from "@/lib/zodValidations";
import useAuthStore from "@/store/authStore/authStore";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";


const Login = () => {

  const router = useRouter();

  const {loginUser,users} = useAuthStore((ele)=>ele)

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: LoginFormValues) => {
    // const users = JSON.parse(localStorage.getItem("Users") || "[]");

    const matchedUser = users.find(
      (user: LoginFormValues) =>
        user.email === values.email && user.password === values.password
    );

    if (matchedUser) {
      loginUser(matchedUser);
      // localStorage.setItem("loggedinUser", JSON.stringify(matchedUser));
      toast.success("Login Successful ✅");
      router.push("/dashboard/blogs");
    } else {
      toast.error("Invalid Credentials ❌");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Login to Your Account
        </h2>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-gray-700">Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-xs" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-gray-700">
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="********"
                      className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-xs" />
                </FormItem>
              )}
            />

            <button
              type="submit"
              className="w-full bg-blue-600 cursor-pointer hover:bg-blue-700 transition-colors text-white font-semibold py-2 rounded-lg shadow-sm"
            >
              Sign In
            </button>
          </form>
        </Form>

        {/* Login Link */}
        <p className="mt-6 text-center text-sm text-gray-600">
          If you have no account?{" "}
          <Link
            href="/signup"
            className="text-blue-600 hover:underline font-medium"
          >
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
