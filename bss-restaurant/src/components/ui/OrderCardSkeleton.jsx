import React from "react";
import { Skeleton, Box, Avatar } from "@mui/material";

const OrderCardSkeleton = () => {
  return (
    <div className="bg-white rounded-[5px] flex flex-col h-[400px] shadow-lg overflow-hidden">
      {/* 1. Header: ID & Actions */}
      <div className="p-4 flex justify-between items-start flex-shrink-0">
        <div className="flex flex-col gap-1">
          {/* Order Number */}
          <Skeleton
            variant="text"
            width={80}
            height={28}
            sx={{ borderRadius: "4px" }}
          />
          {/* Date */}
          <Skeleton
            variant="text"
            width={120}
            height={20}
            sx={{ borderRadius: "4px" }}
          />
        </div>

        <div className="flex gap-2">
          <Skeleton variant="rectangular" width={32} height={32} />
          <Skeleton variant="rectangular" width={32} height={32} />
          <Skeleton variant="rectangular" width={32} height={32} />
        </div>
      </div>

      <div className="border-b border-slate-100 mx-4 flex-shrink-0" />

      {/* 2. Body: Items List */}
      <div className="p-4 flex-grow space-y-5 overflow-hidden">
        {[1, 2, 3].map((_, idx) => (
          <div key={idx} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Food Image */}
              <Skeleton
                variant="rounded"
                width={50}
                height={50}
                sx={{ borderRadius: "5px" }}
              />
              <div className="flex flex-col gap-1">
                {/* Food Name */}
                <Skeleton variant="text" width={100} height={24} />
                {/* Unit Price */}
                <Skeleton variant="text" width={60} height={18} />
              </div>
            </div>
            {/* Quantity */}
            <Skeleton variant="text" width={40} height={20} />
          </div>
        ))}
      </div>

      {/* 3. Footer: Totals and Table */}
      <div className="p-4 bg-white mt-auto border-t border-slate-100 flex-shrink-0">
        <div className="flex justify-between items-end">
          <div className="flex flex-col gap-2">
            {/* Total Quantity */}
            <Skeleton variant="text" width={110} height={20} />
            {/* Total Amount */}
            <Skeleton variant="text" width={150} height={32} />
          </div>

          <div className="flex flex-col items-end gap-2">
            {/* Status Text */}
            <Skeleton variant="text" width={60} height={24} />
            {/* Table Number */}
            <Skeleton variant="text" width={40} height={28} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCardSkeleton;
