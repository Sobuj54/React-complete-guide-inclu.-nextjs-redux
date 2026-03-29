import React from "react";
import { Avatar } from "@mui/material";
import { Edit3, Trash2, ArrowRightLeft } from "lucide-react";
import ActionButton from "../ActionButton";

const OrderCard = ({ order, onEdit, onDelete, onStatusUpdate }) => {
  const getStatusInfo = (status) => {
    const map = {
      Pending: { text: "pending", color: "text-orange-400" },
      Paid: { text: "paid", color: "text-green-500" },
      PreparedToServe: { text: "p.t.s", color: "text-teal-500" },
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
    <div className="bg-white rounded-[5px] shadow-md flex flex-col h-[400px]">
      {/* 1. header: id & actions */}
      <div className="p-4 flex justify-between items-start flex-shrink-0">
        <div className="flex flex-col">
          <span className="text-[15px] font-bold text-slate-700 tracking-tight">
            {order.orderNumber}
          </span>
          <span className="text-[12px] text-slate-400 font-medium">
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
                src={`https://restaurantapi.bssoln.com/images/food/${item.food?.image}`}
                sx={{ width: 50, height: 50 }}
                className=" rounded-[5px] border border-slate-100"
              />
              <div className="flex flex-col">
                <span className=" font-semibold ">{item.food?.name}</span>
                <span className="text-sm ">{item.unitPrice} ৳</span>
              </div>
            </div>
            <span className=" text-sm">qty. {item.quantity}</span>
          </div>
        ))}
      </div>

      {/* 3. footer: totals and table - flex-shrink-0 ensures it stays at the bottom */}
      <div className="p-4 bg-white mt-auto border-t border-slate-300 flex-shrink-0">
        <div className="flex justify-between items-end">
          <div className="flex flex-col gap-1">
            <p className=" font-semibold ">
              total quantity:{" "}
              <span className="text-slate-700 font-extrabold">
                {order.orderItems?.reduce((a, b) => a + b.quantity, 0)}
              </span>
            </p>
            <p className="font-bold ">
              total amount (৳):{" "}
              <span className="text-[#1677ff] font-extrabold border-b-2 border-blue-100 pb-0.5">
                {order.amount}৳
              </span>
            </p>
          </div>

          <div className="flex flex-col items-end">
            <span className={` mb-1 font-bold ${status.color}`}>
              {status.text}
            </span>
            <span className="text-[20px] font-medium leading-none text-slate-500">
              {order.table?.tableNumber || "n/a"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
