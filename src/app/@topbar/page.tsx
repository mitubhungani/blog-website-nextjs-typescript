// "use client";

// import { SidebarTrigger } from "@/components/ui/sidebar";
// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import React from "react";
// import { useRouter } from "next/navigation";
// import useAuthStore from "@/store/authStore/authStore";

// const Topbar = () => {
//   const router = useRouter();

//   const { logoutUser, user } = useAuthStore((state) => state);

//   const handleLogout = () => {
//     logoutUser();
//     router.push("/login");
//   };

//   return (
//     <Card className="flex flex-row items-center justify-between px-4 py-3 sticky top-0 z-50 bg-white shadow-sm rounded-none">
//       <div className="flex items-center gap-4">
//         <SidebarTrigger className="cursor-pointer" />
//         <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
//       </div>

//       {user && (
//         <div className="flex items-center gap-4">
//           <span className="text-sm font-medium text-gray-600">
//             Welcome, {user.username}
//           </span>
//           <Button
//             variant="outline"
//             className="text-sm cursor-pointer"
//             onClick={handleLogout}
//           >
//             Logout
//           </Button>
//         </div>
//       )}
//     </Card>
//   );
// };

// export default Topbar;

"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import useAuthStore from "@/store/authStore/authStore";
import { useRouter } from "next/navigation";
import Link from "next/link";
import React, { useState } from "react";
import { Menu } from "lucide-react";

const Topbar = () => {
  const router = useRouter();
  const { logoutUser, user } = useAuthStore((state) => state);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logoutUser();
    router.push("/login");
  };

  return (
    <Card className="sticky top-0 z-50 w-full bg-white shadow-sm rounded-none border-b px-4 sm:px-6 py-3">
      <div className="flex flex-wrap items-center justify-between gap-y-4">
        {/* Logo + Mobile Menu Button */}
        <div className="flex items-center justify-between w-full sm:w-auto">
          <Link
            href="/"
            className="text-xl font-extrabold text-[#C59FF9] tracking-wide"
          >
            BlogApp
          </Link>
          <button
            className="sm:hidden text-gray-700"
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            <Menu size={24} />
          </button>
        </div>

        {/* Menu: Nav Links + Auth/User */}
        <div
          className={`${
            isMenuOpen ? "flex" : "hidden"
          } sm:flex flex-col sm:flex-row sm:items-center justify-between gap-4 w-full sm:w-auto`}
        >
          {/* Nav Links */}
          <nav className="flex gap-6 text-sm font-medium text-gray-700">
            <Link href="/" className="hover:text-blue-600 transition-colors">
              Home
            </Link>
            <Link
              href="/blogs"
              className="hover:text-blue-600 transition-colors"
            >
              Blogs
            </Link>
          </nav>

          {/* Auth Buttons or User Info */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
            {user ? (
              <>
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      {user.username?.slice(0, 1).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium text-gray-700">
                    Welcome, {user.username}
                  </span>
                </div>
                <Separator
                  orientation="vertical"
                  className="h-6 hidden sm:block"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="text-sm"
                >
                  Logout
                </Button>
              </>
            ) : (
              <div className="flex gap-2">
                <Link href="/login">
                  <Button variant="ghost" size="sm" className="text-sm w-full">
                    Login
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button size="sm" className="text-sm w-full">
                    Signup
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Topbar;
