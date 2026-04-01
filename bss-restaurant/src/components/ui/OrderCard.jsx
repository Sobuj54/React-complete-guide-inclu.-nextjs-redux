import React from "react";
import { Avatar } from "@mui/material";
import { Edit3, Trash2, ArrowRightLeft } from "lucide-react";
import ActionButton from "../ActionButton";
import ResponsiveTooltip from "../ResponsiveTooltip";

const OrderCard = ({ order, onEdit, onDelete, onStatusUpdate }) => {
  const getStatusInfo = (status) => {
    const map = {
      Pending: { text: "pending", color: "text-orange-400" },
      Paid: { text: "paid", color: "text-green-500" },
      PreparedToServe: { text: "PreparedToServe", color: "text-teal-500" },
      Cancelled: { text: "cancelled", color: "text-red-500" },
    };
    return (
      map[status] || { text: status.toLowerCase(), color: "text-slate-400" }
    );
  };

  const status = getStatusInfo(order.orderStatus);

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(new Date(order.orderTime));

  return (
    /* added h-[400px] to fix the card height */
    <div className="bg-white rounded-[5px] flex flex-col h-[430px] shadow-lg py-5 px-2">
      {/* 1. header: id & actions */}
      <div className="p-4 flex justify-between items-start flex-shrink-0">
        <div className="flex flex-col">
          <ResponsiveTooltip
            title={order.orderNumber}
            id={`order-${order.orderNumber}`}
          >
            <span className="text-lg font-bold text-slate-700 tracking-tight truncate max-w-[150px] md:max-w-full block">
              {order.orderNumber}
            </span>
          </ResponsiveTooltip>
          <span className="text-sm text-slate-400 font-medium">
            {formattedDate}
          </span>
        </div>

        <div className="flex gap-1 p-1 rounded-md ">
          <ActionButton
            icon={ArrowRightLeft}
            title="status"
            colorType="warning"
            onClick={onStatusUpdate}
          />
          <ActionButton
            icon={Edit3}
            title="edit"
            colorType="primary"
            onClick={onEdit}
          />
          <ActionButton
            icon={Trash2}
            title="delete"
            colorType="error"
            onClick={onDelete}
          />
        </div>
      </div>

      <div className="border-b border-slate-400 mx-4 flex-shrink-0" />
      {/* 2. body: items list - added overflow-y-auto to allow scrolling */}
      <div className="p-4 flex-grow space-y-5 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200">
        {order.orderItems?.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar
                variant="rounded"
                src={`${import.meta.env.VITE_IMG_URL}/images/food/${item.food?.image}`}
                sx={{ width: 50, height: 50 }}
                className=" rounded-[5px] border border-slate-100"
              />
              <div className="flex flex-col">
                <span className=" font-semibold text-lg">
                  {item.food?.name}
                </span>
                <span className="text-sm ">{item.unitPrice} ৳</span>
              </div>
            </div>
            <span className=" text-base">qty. {item.quantity}</span>
          </div>
        ))}
      </div>

      <div className="border-b border-slate-400 mx-4 flex-shrink-0" />

      {/* 3. footer: totals and table - flex-shrink-0 ensures it stays at the bottom */}
      <div className="p-4 bg-white mt-auto  flex-shrink-0 rounded-b-[5px]">
        <div className="flex justify-between">
          <div className="flex flex-col gap-1">
            <p className="text-sm font-semibold ">
              Total Quantity:{" "}
              <span className="text-slate-700 ">
                {order.orderItems?.reduce((a, b) => a + b.quantity, 0)}
              </span>
            </p>
            <p className="font-semibold text-lg md:text-xl">
              Total Amount <span className="hidden md:block">(৳)</span>:
              <span className="text-[#1677ff]">{order.amount}৳</span>
            </p>
          </div>

          <div className="flex flex-col items-end gap-1">
            <ResponsiveTooltip title={status.text} id={order.orderNumber}>
              <p
                className={` mb-1 font-bold ${status.color} leading-tight max-w-[70px] md:max-w-full truncate`}
              >
                {status.text}
              </p>
            </ResponsiveTooltip>
            <ResponsiveTooltip
              title={order.table?.tableNumber}
              id={order.orderNumber}
            >
              <p className="text-lg font-medium leading-none text-slate-500 max-w-[50px] md:max-w-full truncate">
                {order.table?.tableNumber || "n/a"}
              </p>
            </ResponsiveTooltip>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
