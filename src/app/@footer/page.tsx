import React from "react";
import Link from "next/link";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa6";


const Footer = () => {
  return (
    <footer className="bg-gray-100 border-t border-gray-200 py-10 mt-10">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        
        {/* Text Logo */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800">DreamBlog</h2>
          <p className="text-sm text-gray-600 mt-2">
            Discover inspiring stories, insights, and ideas from passionate writers.
          </p>
        </div>

        {/* Page Links */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Pages</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>
              <Link href="/addblog" className="hover:underline">
                Add Blog
              </Link>
            </li>
            <li>
              <Link href="/blogs" className="hover:underline">
                Blogs
              </Link>
            </li>
            <li>
              <Link href="/favourite" className="hover:underline">
                Favorites
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Follow Us</h3>
          <div className="flex items-center gap-4">
          <FaGithub className="text-2xl cursor-pointer" />

            <FaInstagram className="text-2xl cursor-pointer" />

            <FaLinkedin className="text-2xl cursor-pointer"  />

          </div>
        </div>
      </div>

      <div className="mt-10 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} DreamBlog. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
