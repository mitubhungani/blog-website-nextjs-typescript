"use client";

import FeaturedBlog from "@/components/featuredBlog/featuredBlog";
import HeroSection from "@/components/heroSection/heroSection";

export default function Home() {
  return (
    <div>
      <section className=" ">
        <HeroSection />
      </section>
      <section>
        <FeaturedBlog />
      </section>
    </div>
  );
}
