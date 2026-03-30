import React from "react";
import { Skeleton, Box, Avatar } from "@mui/material";

const OrderCardSkeleton = () => {
  return (
    <div className="bg-white rounded-[5px] flex flex-col h-[400px] shadow-sm animate-pulse">
      {/* 1. Header Skeleton */}
      <div className="p-4 flex justify-between items-start flex-shrink-0">
        <div className="flex flex-col gap-1">
          {/* Order Number Placeholder */}
          <Skeleton
            variant="text"
            width={80}
            height={20}
            sx={{ borderRadius: "4px" }}
          />
          {/* Date Placeholder */}
          <Skeleton
            variant="text"
            width={120}
            height={15}
            sx={{ borderRadius: "4px" }}
          />
        </div>

        {/* Action Buttons Placeholders */}
        <div className="flex gap-2">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} variant="rectangular" width={32} height={32} />
          ))}
        </div>
      </div>

      <div className="border-b border-slate-100 mx-4 flex-shrink-0" />

      {/* 2. Body: Items List Skeleton */}
      <div className="p-4 flex-grow space-y-5 overflow-hidden">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Food Image Placeholder */}
              <Skeleton
                variant="rounded"
                width={50}
                height={50}
                sx={{ borderRadius: "5px" }}
              />
              <div className="flex flex-col gap-1">
                {/* Food Name Placeholder */}
                <Skeleton variant="text" width={100} height={20} />
                {/* Price Placeholder */}
                <Skeleton variant="text" width={40} height={15} />
              </div>
            </div>
            {/* Quantity Placeholder */}
            <Skeleton variant="text" width={40} height={20} />
          </div>
        ))}
      </div>

      {/* 3. Footer Skeleton */}
      <div className="p-4 bg-white mt-auto border-t border-slate-50 flex-shrink-0 rounded-b-[5px]">
        <div className="flex justify-between items-end">
          <div className="flex flex-col gap-3">
            {/* Total Quantity Placeholder */}
            <Skeleton variant="text" width={110} height={20} />
            {/* Total Amount Placeholder */}
            <Skeleton variant="text" width={130} height={24} />
          </div>

          <div className="flex flex-col items-end gap-2">
            {/* Status Text Placeholder */}
            <Skeleton variant="text" width={60} height={20} />
            {/* Table Number Placeholder */}
            <Skeleton
              variant="rectangular"
              width={40}
              height={30}
              sx={{ borderRadius: "4px" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCardSkeleton;
