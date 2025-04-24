"use client";

import FeaturedBlog from "@/components/featuredBlog/featuredBlog";
// import Footer from "@/app/@footer/page";
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
      {/* <section>
        <Footer />
      </section> */}
    </div>
  );
}
