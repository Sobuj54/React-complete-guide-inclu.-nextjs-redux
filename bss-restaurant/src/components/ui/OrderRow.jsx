import { useState } from "react";
import {
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Avatar,
  Chip,
} from "@mui/material";
import {
  ChevronDown,
  ChevronUp,
  Edit3,
  Trash2,
  ShoppingBag,
  ArrowRightLeft,
} from "lucide-react";
import ActionButton from "../ActionButton";
import MainButton from "../MainButton";
import ResponsiveTooltip from "../ResponsiveTooltip"; // Ensure correct path

const OrderRow = ({ order, onEdit, onDelete, onStatusUpdate }) => {
  const [open, setOpen] = useState(false);

  const getStatusStyles = (status) => {
    switch (status) {
      case "Pending":
        return {
          bgcolor: "#fffbeb",
          color: "#9a3412",
          border: "1px solid #fef3c7",
        };
      case "Confirmed":
        return {
          bgcolor: "#eff6ff",
          color: "#1d4ed8",
          border: "1px solid #dbeafe",
        };
      case "Preparing":
        return {
          bgcolor: "#f5f3ff",
          color: "#6d28d9",
          border: "1px solid #ede9fe",
        };
      case "PreparedToServe":
        return {
          bgcolor: "#faf5ff",
          color: "#7e22ce",
          border: "1px solid #f3e8ff",
        };
      case "Served":
        return {
          bgcolor: "#f0fdfa",
          color: "#0f766e",
          border: "1px solid #ccfbf1",
        };
      case "Paid":
        return {
          bgcolor: "#f0fdf4",
          color: "#15803d",
          border: "1px solid #dcfce7",
        };
      case "Cancelled":
        return {
          bgcolor: "#fef2f2",
          color: "#b91c1c",
          border: "1px solid #fee2e2",
        };
      default:
        return {
          bgcolor: "#f8fafc",
          color: "#64748b",
          border: "1px solid #e2e8f0",
        };
    }
  };

  const statusStyle = getStatusStyles(order.orderStatus);

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(new Date(order.orderTime));

  const cellStyle = {
    color: "#1e293b",
    py: 1,
    borderBottom: "1px solid secondary.main",
    fontSize: "14px",
  };

  const customerName =
    order.orderedBy?.fullName !== "Unknown"
      ? order.orderedBy?.fullName
      : "Guest User";
  const tableNum = order.table?.tableNumber || "No Table";

  return (
    <>
      <TableRow
        sx={{
          "& > *": { borderBottom: "unset" },
          bgcolor: open ? "#f8fafc" : "transparent",
          transition: "all 0.2s ease",
          "&:hover": { bgcolor: "#f1f5f9" },
        }}
      >
        <TableCell sx={{ width: 50, py: 0 }}>
          <IconButton
            size="small"
            onClick={() => setOpen(!open)}
            sx={{
              bgcolor: open ? "#1677ff" : "#f1f5f9",
              color: open ? "white" : "#64748b",
              borderRadius: "5px",
              "&:hover": { bgcolor: open ? "#0958d9" : "#e2e8f0" },
            }}
          >
            {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </IconButton>
        </TableCell>

        <TableCell sx={cellStyle}>
          <ResponsiveTooltip
            title={`#${order.orderNumber}`}
            id={`${order.id}-order`}
          >
            <Typography
              sx={{ fontWeight: 500, fontSize: "13px" }}
              className="truncate max-w-[60px] md:max-w-full cursor-pointer"
            >
              #{order.orderNumber}
            </Typography>
          </ResponsiveTooltip>
        </TableCell>

        <TableCell sx={cellStyle}>
          <ResponsiveTooltip
            title={`#${formattedDate}`}
            id={`${order.id}-order`}
          >
            <Typography
              variant="body2"
              sx={{ fontSize: "12px", color: "#64748b" }}
              className="max-w-[60px] md:max-w-full truncate"
            >
              {formattedDate}
            </Typography>
          </ResponsiveTooltip>
        </TableCell>

        <TableCell sx={cellStyle}>
          <ResponsiveTooltip title={customerName} id={`${order.id}-cust`}>
            <Typography
              variant="body2"
              sx={{ color: "#334155" }}
              className="truncate max-w-[60px] md:max-w-full cursor-pointer"
            >
              {customerName}
            </Typography>
          </ResponsiveTooltip>
        </TableCell>

        <TableCell sx={cellStyle}>
          <ResponsiveTooltip title={tableNum} id={`${order.id}-table`}>
            <Chip
              label={tableNum}
              size="small"
              sx={{
                borderRadius: "4px",
                bgcolor: "#f1f5f9",
                fontWeight: 700,
                fontSize: "11px",
                color: "#475569",
                maxWidth: "60px",
                cursor: "pointer",
                "& .MuiChip-label": {
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                },
              }}
            />
          </ResponsiveTooltip>
        </TableCell>

        <TableCell sx={cellStyle}>
          <Box
            sx={{
              display: "inline-flex",
              px: 1.2,
              py: 0.4,
              borderRadius: "4px",
              fontSize: "11px",
              fontWeight: 800,
              letterSpacing: "0.5px",
              textTransform: "uppercase",
              ...statusStyle,
            }}
          >
            {order.orderStatus}
          </Box>
        </TableCell>

        <TableCell sx={{ ...cellStyle, color: "#0f172a" }}>
          {order.amount?.toLocaleString()} ৳
        </TableCell>

        <TableCell sx={cellStyle}>
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
            <ActionButton
              icon={ArrowRightLeft}
              title="Update Status"
              colorType="warning"
              onClick={onStatusUpdate}
            />
            <ActionButton
              icon={Edit3}
              title="Edit Order"
              colorType="primary"
              onClick={onEdit}
            />
            <ActionButton
              icon={Trash2}
              title="Delete Order"
              colorType="error"
              onClick={onDelete}
            />
          </Box>
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ padding: 0, border: "none" }} colSpan={8}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box
              sx={{
                margin: 2,
                bgcolor: "#ffffff",
                p: 3,
                borderRadius: "8px",
                border: "1px solid #e2e8f0",
                boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.05)",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2.5,
                }}
              >
                <Typography
                  variant="subtitle2"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.2,
                    fontWeight: 800,
                    color: "#1e293b",
                    textTransform: "uppercase",
                    fontSize: "12px",
                    letterSpacing: "0.5px",
                  }}
                >
                  <ShoppingBag size={18} style={{ color: "#1677ff" }} />
                  Items Summary ({order.orderItems?.length})
                </Typography>
              </Box>

              <Table size="small">
                <TableHead>
                  <TableRow sx={{ bgcolor: "#f8fafc" }}>
                    <TableCell
                      sx={{ fontWeight: 700, color: "#64748b", py: 0.5 }}
                    >
                      Food Item
                    </TableCell>
                    <TableCell sx={{ fontWeight: 700, color: "#64748b" }}>
                      Quantity
                    </TableCell>
                    <TableCell sx={{ fontWeight: 700, color: "#64748b" }}>
                      Unit Price
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ fontWeight: 700, color: "#64748b" }}
                    >
                      Subtotal
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {order.orderItems?.map((item, idx) => (
                    <TableRow
                      key={item.id || idx}
                      sx={{ "&:last-child td": { border: 0, py: 0 } }}
                    >
                      <TableCell sx={{ py: 0.5 }}>
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 2 }}
                        >
                          <Avatar
                            variant="rounded"
                            src={`${import.meta.env.VITE_IMG_URL}/images/food/${item.food?.image}`}
                            sx={{
                              width: 42,
                              height: 42,
                              borderRadius: "6px",
                              border: "1px solid #f1f5f9",
                            }}
                          />
                          <Typography
                            variant="body2"
                            sx={{ fontWeight: 600, color: "#334155" }}
                          >
                            {item.food?.name}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell sx={{ fontWeight: 700, color: "#64748b" }}>
                        x{item.quantity}
                      </TableCell>
                      <TableCell sx={{ color: "#64748b" }}>
                        {item.unitPrice} ৳
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{ fontWeight: 800, color: "#1e293b" }}
                      >
                        {item.totalPrice} ৳
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default OrderRow;
