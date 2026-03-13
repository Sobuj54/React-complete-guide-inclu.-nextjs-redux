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
  Chip,
  Avatar,
  Tooltip,
} from "@mui/material";
import {
  ChevronDown,
  ChevronUp,
  Edit3,
  Trash2,
  RefreshCw,
  ShoppingBag,
} from "lucide-react";

const OrderRow = ({
  order,
  onEdit,
  onDelete,
  onStatusUpdate,
  statusConfig,
}) => {
  const [open, setOpen] = useState(false);
  const config = statusConfig[order.orderStatus] || statusConfig?.Pending;

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(new Date(order.orderTime));

  const cellStyle = {
    color: "#1e293b",
    py: 2.5,
    borderBottom: "1px solid #f1f5f9",
  };

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
        <TableCell sx={{ width: 50 }}>
          <IconButton
            size="small"
            onClick={() => setOpen(!open)}
            sx={{
              bgcolor: open ? "#ea580c" : "#f1f5f9",
              color: open ? "white" : "#64748b",
              "&:hover": { bgcolor: open ? "#c2410c" : "#e2e8f0" },
            }}
          >
            {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </IconButton>
        </TableCell>

        <TableCell sx={cellStyle}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {order.orderNumber}
          </Box>
        </TableCell>

        <TableCell sx={cellStyle}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="body2" sx={{ fontSize: "13px" }}>
              {formattedDate}
            </Typography>
          </Box>
        </TableCell>

        <TableCell sx={cellStyle}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="body2">
              {order.orderedBy?.fullName !== "Unknown"
                ? order.orderedBy?.fullName
                : "Guest"}
            </Typography>
          </Box>
        </TableCell>

        <TableCell sx={cellStyle}>
          <Typography variant="body2">
            {order.table?.tableNumber || "N/A"}
          </Typography>
        </TableCell>

        <TableCell sx={cellStyle}>
          <Typography variant="body2">{order.orderStatus}</Typography>
        </TableCell>

        <TableCell sx={{ ...cellStyle, color: "#0f172a" }}>
          {order.amount?.toLocaleString()} ৳
        </TableCell>

        <TableCell sx={cellStyle}>
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
            <Tooltip title="Change Status">
              <IconButton
                onClick={onStatusUpdate}
                size="small"
                sx={{
                  border: "1px solid #e2e8f0",
                  borderRadius: "7px",
                  color: "#f97316",
                  "&:hover": { bgcolor: "#fff7ed", borderColor: "#f97316" },
                }}
              >
                <RefreshCw size={16} strokeWidth={2.5} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Edit">
              <IconButton
                onClick={onEdit}
                size="small"
                sx={{
                  border: "1px solid #e2e8f0",
                  borderRadius: "7px",
                  color: "#64748b",
                  "&:hover": { bgcolor: "#f8fafc", borderColor: "#64748b" },
                }}
              >
                <Edit3 size={16} strokeWidth={2.5} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton
                onClick={onDelete}
                size="small"
                sx={{
                  border: "1px solid #e2e8f0",
                  borderRadius: "7px",
                  color: "#ef4444",
                  "&:hover": { bgcolor: "#fef2f2", borderColor: "#ef4444" },
                }}
              >
                <Trash2 size={16} strokeWidth={2.5} />
              </IconButton>
            </Tooltip>
          </Box>
        </TableCell>
      </TableRow>

      {/* Collapsible Content */}
      <TableRow>
        <TableCell
          style={{ paddingBottom: 0, paddingTop: 0, border: "none" }}
          colSpan={8}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box
              sx={{
                margin: 2,
                bgcolor: "oklch(98.4% 0.003 247.858)",
                p: 3,
                borderRadius: "7px",
                boxShadow: "10px 10px 5px -5px rgba(0,0,0,0.05)",
              }}
            >
              <Typography
                variant="subtitle2"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  mb: 2,
                  letterSpacing: "1px",
                }}
              >
                <ShoppingBag size={18} className="text-orange-500" /> Items
                Summary ({order.orderItems?.length})
              </Typography>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Food Item</TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 700,
                        fontSize: "13px",
                      }}
                    >
                      Quantity
                    </TableCell>
                    <TableCell>Unit Price</TableCell>
                    <TableCell align="right">Subtotal</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {order.orderItems?.map((item, idx) => (
                    <TableRow key={item.id || idx}>
                      <TableCell
                        sx={{
                          py: 1.5,
                        }}
                      >
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 2 }}
                        >
                          <Avatar
                            variant="rounded"
                            src={`https://bssrms.runasp.net/images/food/${item.food?.image}`}
                            sx={{
                              width: 45,
                              height: 45,
                              borderRadius: "12px",
                            }}
                          />
                          <Typography variant="body2">
                            {item.food?.name}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>x{item.quantity}</TableCell>
                      <TableCell>{item.unitPrice} ৳</TableCell>
                      <TableCell align="right">{item.totalPrice} ৳</TableCell>
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
