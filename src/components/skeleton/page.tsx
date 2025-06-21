import React from "react";
import { Skeleton } from "@/components/ui/skeleton"; // Added Skeleton for loading
const Skeletone = () => {
  return (
    <div className="max-w-3xl mx-auto">
      <Skeleton className="w-full h-72 md:h-96 object-cover" />{" "}
      {/* Image Skeleton */}
      <Skeleton className="h-10 my-9 w-3/4 mb-4" /> {/* Title Skeleton */}
      <div className="flex justify-between items-center mb-6">
        <div className="space-y-2">
          <Skeleton className="h-6 w-48" /> {/* Author Skeleton */}
          <Skeleton className="h-4 w-32" /> {/* Date Skeleton */}
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-10 w-10 rounded-full" />{" "}
          {/* Action Skeleton */}
          <Skeleton className="h-10 w-10 rounded-full" />{" "}
          {/* Action Skeleton */}
        </div>
      </div>
      <div className="space-y-4">
        {" "}
        {/* Content Skeleton */}
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-full" />
      </div>
    </div>
  );
};

export default Skeletone;
