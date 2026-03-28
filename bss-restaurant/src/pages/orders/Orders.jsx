import { useState, useEffect } from "react";
import { Search, AlertCircle, Loader2, X } from "lucide-react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Skeleton,
  Box,
  TablePagination,
  Dialog,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  TextField,
  InputAdornment,
} from "@mui/material";

// Hooks
import { useOrders, useOrderMutations } from "../../hooks/useOrders";

// Components
import EditOrderModal from "../../components/ui/EditOrderModal";
import OrderRow from "../../components/ui/OrderRow";

export const STATUS_CONFIG = {
  Pending: { bg: "#fffbeb" },
  Confirmed: { bg: "#eff6ff" },
  Preparing: { bg: "#f5f3ff" },
  PreparedToServe: { bg: "#faf5ff" },
  Served: { bg: "#f0fdfa" },
  Paid: { bg: "#f0fdf4" },
  Cancelled: { bg: "#fef2f2" },
};

export default function Orders() {
  const [filters, setFilters] = useState({
    Page: 1,
    Per_Page: 10,
    Search: "",
    Sort: "-createdat",
  });
  const [searchInput, setSearchInput] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modals, setModals] = useState({ edit: false, delete: false });

  // Status Menu State
  const [anchorEl, setAnchorEl] = useState(null);
  const openStatusMenu = Boolean(anchorEl);

  const { data: response, isLoading } = useOrders(filters);
  const { deleteOrder, updateOrder, updateStatus } = useOrderMutations();

  useEffect(() => {
    const delay = setTimeout(() => {
      setFilters((p) => ({ ...p, Search: searchInput, Page: 1 }));
    }, 500);
    return () => clearTimeout(delay);
  }, [searchInput]);

  const toggleModal = (type, order = null) => {
    setSelectedOrder(order);
    setModals((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  // --- Status Menu Handlers ---
  const handleStatusClick = (event, order) => {
    setSelectedOrder(order);
    setAnchorEl(event.currentTarget);
  };

  const handleStatusClose = () => {
    setAnchorEl(null);
  };

  const handleStatusUpdate = (newStatus) => {
    updateStatus.mutate(
      { id: selectedOrder.id, status: newStatus },
      { onSuccess: handleStatusClose },
    );
  };

  return (
    <div className=" space-y-3 min-h-screen ">
      <header className="flex items-center justify-end">
        <TextField
          size="small"
          placeholder="Search tables..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search size={18} color="#bfbfbf" />
              </InputAdornment>
            ),
            sx: {
              borderRadius: "5px",
              bgcolor: "white",
              minWidth: { md: "250px" },
            },
          }}
        />
      </header>

      <TableContainer
        component={Paper}
        elevation={0}
        sx={{
          borderRadius: "5px",
          overflow: "hidden",
          boxShadow: "0 4px 20px -10px rgba(0,0,0,0.1)",
          overflowX: "auto",
        }}
      >
        <Table sx={{ minWidth: "900px" }}>
          <TableHead sx={{ bgcolor: "#f8fafc" }}>
            <TableRow>
              <TableCell sx={{ py: 0 }} />
              {[
                "Order",
                "Date Time",
                "Customer",
                "Table",
                "Status",
                "Amount",
                "Actions",
              ].map((h) => (
                <TableCell
                  key={h}
                  align={h == "Actions" ? "right" : ""}
                  sx={{ pr: 5, py: 1.5 }}
                >
                  {h}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading
              ? [...Array(5)].map((_, i) => (
                  <TableRow key={i}>
                    <TableCell colSpan={8}>
                      <Skeleton height={50} sx={{ borderRadius: "7px" }} />
                    </TableCell>
                  </TableRow>
                ))
              : response?.data?.map((order) => (
                  <OrderRow
                    key={order.id}
                    order={order}
                    statusConfig={STATUS_CONFIG} // Add this back!
                    onEdit={() => toggleModal("edit", order)}
                    onDelete={() => toggleModal("delete", order)}
                    onStatusUpdate={(e) => handleStatusClick(e, order)} // Pass the event for the Menu anchor
                  />
                ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={response?.total || 0}
          rowsPerPage={filters.Per_Page || 10}
          page={filters.Page - 1}
          onPageChange={(_, p) =>
            setFilters((prev) => ({ ...prev, Page: p + 1 }))
          }
          // ADD THIS LINE BELOW
          onRowsPerPageChange={(e) => {
            setFilters((prev) => ({
              ...prev,
              Per_Page: parseInt(e.target.value, 10),
              Page: 1, // Reset to first page when changing limit
            }));
          }}
        />
      </TableContainer>

      {/* --- STATUS UPDATE HOVER/CLICK MENU --- */}
      <Menu
        anchorEl={anchorEl}
        open={openStatusMenu}
        onClose={handleStatusClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Box sx={{ px: 2, py: 1 }}>
          <Typography
            sx={{
              fontWeight: 900,
              fontSize: "10px",
              color: "#94a3b8",
              textTransform: "uppercase",
            }}
          >
            Select Status
          </Typography>
        </Box>
        {Object.entries(STATUS_CONFIG).map(([key, config]) => (
          <MenuItem
            key={key}
            onClick={() => handleStatusUpdate(key)}
            sx={{
              py: 1.5,
              mx: 1,
              borderRadius: "5px",
              gap: 1.5,
            }}
          >
            <Typography sx={{ fontWeight: 700, fontSize: "13px" }}>
              {key}
            </Typography>
          </MenuItem>
        ))}
      </Menu>

      {/* --- BEAUTIFIED DELETE MODAL --- */}
      <Dialog
        open={modals.delete}
        onClose={() => !deleteOrder.isPending && toggleModal("delete")}
        maxWidth="xs"
        fullWidth
        PaperProps={{ sx: { borderRadius: "7px", p: 1 } }}
      >
        <IconButton
          onClick={() => toggleModal("delete")}
          disabled={deleteOrder.isPending}
          sx={{ position: "absolute", right: 12, top: 12, color: "#94a3b8" }}
        >
          <X size={18} />
        </IconButton>

        <DialogContent
          sx={{
            mt: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: 70,
              height: 70,
              bgcolor: "#fef2f2",
              color: "#ef4444",
              borderRadius: "7px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 3,
            }}
          >
            <AlertCircle size={36} strokeWidth={2.5} />
          </Box>

          <Typography
            variant="h6"
            sx={{
              fontWeight: 900,
              color: "#0f172a",
              mb: 1,
              textAlign: "center",
            }}
          >
            Are you absolutely sure?
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "#64748b",
              fontWeight: 500,
              textAlign: "center",
              px: 2,
            }}
          >
            You are about to delete{" "}
            <span className="text-slate-900 font-black">
              Order #{selectedOrder?.orderNumber}
            </span>
            . This action cannot be undone.
          </Typography>
        </DialogContent>

        <DialogActions
          sx={{ flexDirection: "column", gap: 1.5, px: 3, pb: 4, pt: 1 }}
        >
          <Button
            fullWidth
            onClick={() =>
              deleteOrder.mutate(selectedOrder.id, {
                onSuccess: () => toggleModal("delete"),
              })
            }
            disabled={deleteOrder.isPending}
            sx={{
              bgcolor: "#ef4444",
              color: "white",
              borderRadius: "7px",
              py: 1.5,
              fontWeight: 900,
              textTransform: "none",
              "&:hover": { bgcolor: "#dc2626" },
              boxShadow: "none",
            }}
          >
            {deleteOrder.isPending ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              "Yes, Delete Order"
            )}
          </Button>
          <Button
            fullWidth
            onClick={() => toggleModal("delete")}
            disabled={deleteOrder.isPending}
            sx={{
              color: "#64748b",
              bgcolor: "#f1f5f9",
              borderRadius: "7px",
              py: 1.5,
              fontWeight: 900,
              textTransform: "none",
              m: "0 !important",
            }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      <EditOrderModal
        isOpen={modals.edit}
        onClose={() => toggleModal("edit")}
        order={selectedOrder}
        onUpdate={({ id, payload }) =>
          updateOrder.mutate(
            { id, payload },
            { onSuccess: () => toggleModal("edit") },
          )
        }
        isSubmitting={updateOrder.isPending}
      />
    </div>
  );
}
