import React from "react";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-br bg-[#FFFEFF] py-20 px-6 sm:px-10">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <h1
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-800"
          style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700 }}
        >
          Discover Inspiring Stories & Insights
        </h1>

        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Welcome to{" "}
          <span className="font-semibold text-blue-600">DreamBlog</span>, where
          passionate writers share their knowledge, experiences, and creativity.
          Dive into a world of thought-provoking stories.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
          <Link href="/blogs">
            <button className="px-6 py-3 text-white bg-[#a362ff] hover:bg-[#b286f0] rounded-lg text-sm font-semibold transition cursor-pointer">
              Explore Blog
            </button>
          </Link>
          <Link href="/signup">
            <button className="px-6 py-3 border border-[#a362ff] text-black hover:bg-blue-50 rounded-lg text-sm font-semibold transition">
              Join Our Community
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
