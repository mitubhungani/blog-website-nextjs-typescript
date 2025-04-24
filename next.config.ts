// import type { NextConfig } from "next";
// import createMDX from '@next/mdx'

// const nextConfig: NextConfig = {
//   /* config options here */
//    images: {
//     domains: ["img.freepik.com"], // Add your domain here
//   },
//   pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],

// };

// const withMDX = createMDX({
  
// });

// export default withMDX(nextConfig);

import createMDX from '@next/mdx'
import { NextConfig } from 'next'
 
/** @type {import('next').NextConfig} */
const nextConfig:NextConfig = {
  images: {
         domains: ["img.freepik.com"], // Add your domain here
       },
  // Configure `pageExtensions` to include markdown and MDX files
  pageExtensions: ['md', 'mdx', 'ts', 'tsx'],
  // Optionally, add any other Next.js config below
}
 
const withMDX = createMDX({
  // Add markdown plugins here, as desired
})
 
// Merge MDX config with Next.js config
export default withMDX(nextConfig)

