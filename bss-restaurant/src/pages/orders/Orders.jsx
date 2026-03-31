import { useState, useEffect } from "react";
import { Search, List, LayoutGrid, Filter, Check } from "lucide-react";
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
  Typography,
  Menu,
  MenuItem,
  TextField,
  InputAdornment,
  Button,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

import { useOrders, useOrderMutations } from "../../hooks/useOrders";
import EditOrderModal from "../../components/ui/EditOrderModal";
import OrderRow from "../../components/ui/OrderRow";
import DeleteConfirmationModal from "../../components/ui/DeleteConfirmationModal";
import OrderCard from "../../components/ui/OrderCard";
import OrderCardSkeleton from "../../components/ui/OrderCardSkeleton";

// numeric status mapping for the api
const STATUS_MAP = {
  pending: 0,
  confirmed: 1,
  preparing: 2,
  preparedToServe: 3,
  served: 4,
  paid: 5,
};

export default function Orders() {
  const [viewMode, setViewMode] = useState("grid");
  const [filters, setFilters] = useState({
    Page: 1,
    Per_Page: 10,
    Search: "",
    Sort: "-createdat",
    Status: "", // holds the number for api
  });

  const [searchInput, setSearchInput] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modals, setModals] = useState({ edit: false, delete: false });
  const [statusAnchorEl, setStatusAnchorEl] = useState(null);
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);

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

  const getActiveFilterLabel = () => {
    if (filters.Status === "") return "filter orders";
    const key = Object.keys(STATUS_MAP).find(
      (k) => STATUS_MAP[k] === filters.Status,
    );
    return `filter: ${key}`;
  };

  return (
    <div className="space-y-4 min-h-screen">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <ToggleButtonGroup
            value={viewMode}
            exclusive
            onChange={(e, v) => v && setViewMode(v)}
            size="small"
            className="bg-white"
          >
            <ToggleButton
              value="table"
              className="border-none px-4 py-1.5 rounded-md font-bold"
            >
              <List size={18} className="mr-2" /> list
            </ToggleButton>
            <ToggleButton
              value="grid"
              className="border-none px-4 py-1.5 rounded-md font-bold"
            >
              <LayoutGrid size={18} className="mr-2" /> grid
            </ToggleButton>
          </ToggleButtonGroup>
        </div>

        <div className="flex  items-center gap-3 ">
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
                width: { xs: "200px" },
              },
            }}
          />

          <Button
            variant="contained"
            disableElevation
            startIcon={<Filter size={18} />}
            onClick={(e) => setFilterAnchorEl(e.currentTarget)}
            className={`bg-white text-slate-600 border rounded-[5px] px-4 font-bold ${filters.Status !== "" ? "border-blue-500 ring-1 ring-blue-500" : "border-slate-200"}`}
            sx={{
              textTransform: "none",
              color: "secondary.darker",
              bgcolor: "white",
              "&:hover": { bgcolor: "#f8fafc" },
              py: 1,
            }}
          >
            {getActiveFilterLabel()}
          </Button>

          <Menu
            anchorEl={filterAnchorEl}
            open={Boolean(filterAnchorEl)}
            onClose={() => setFilterAnchorEl(null)}
            slotProps={{
              paper: { sx: { borderRadius: "5px", mt: 1, minWidth: "180px" } },
            }}
          >
            <MenuItem
              onClick={() => {
                setFilters((p) => ({ ...p, Status: "", Page: 1 }));
                setFilterAnchorEl(null);
              }}
              className="font-bold  text-[13px]"
            >
              show all{" "}
              {filters.Status === "" && (
                <Check size={14} className="ml-auto text-blue-500" />
              )}
            </MenuItem>
            <div className="border-t border-slate-100 my-1" />
            {Object.entries(STATUS_MAP).map(([name, value]) => (
              <MenuItem
                key={value}
                onClick={() => {
                  setFilters((p) => ({ ...p, Status: value, Page: 1 }));
                  setFilterAnchorEl(null);
                }}
                className="font-medium text-slate-700 text-[13px] py-2"
              >
                {name}
                {filters.Status === value && (
                  <Check size={14} className="ml-auto text-blue-500" />
                )}
              </MenuItem>
            ))}
          </Menu>
        </div>
      </header>

      {/* cards or table grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <OrderCardSkeleton key={i} />
          ))}
        </div>
      ) : viewMode === "table" ? (
        <TableContainer
          component={Paper}
          elevation={0}
          className="border border-slate-200 rounded-[5px] overflow-hidden shadow-sm"
        >
          <Table sx={{ minWidth: "900px" }}>
            <TableHead sx={{ bgcolor: "#f8fafc" }}>
              <TableRow>
                <TableCell sx={{ py: 0 }} />
                {[
                  "order",
                  "date time",
                  "customer",
                  "table",
                  "status",
                  "amount",
                  "actions",
                ].map((h) => (
                  <TableCell
                    key={h}
                    sx={{
                      py: 1.5,
                    }}
                    align={h == "actions" ? "right" : ""}
                  >
                    {h}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {response?.data?.map((order) => (
                <OrderRow
                  key={order.id}
                  order={order}
                  onEdit={() => toggleModal("edit", order)}
                  onDelete={() => toggleModal("delete", order)}
                  onStatusUpdate={(e) => {
                    setSelectedOrder(order);
                    setStatusAnchorEl(e.currentTarget);
                  }}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {response?.data?.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              onEdit={() => toggleModal("edit", order)}
              onDelete={() => toggleModal("delete", order)}
              onStatusUpdate={(e) => {
                setSelectedOrder(order);
                setStatusAnchorEl(e.currentTarget);
              }}
            />
          ))}
        </div>
      )}

      <TablePagination
        component="div"
        count={response?.total || 0}
        rowsPerPage={filters.Per_Page || 10}
        page={filters.Page - 1}
        onPageChange={(_, p) =>
          setFilters((prev) => ({ ...prev, Page: p + 1 }))
        }
        onRowsPerPageChange={(e) =>
          setFilters((prev) => ({
            ...prev,
            Per_Page: parseInt(e.target.value, 10),
            Page: 1,
          }))
        }
        sx={{ bgcolor: "background.paper", borderRadius: "5px", mb: 3 }}
      />

      {/* update status menu */}
      <Menu
        anchorEl={statusAnchorEl}
        open={Boolean(statusAnchorEl)}
        onClose={() => setStatusAnchorEl(null)}
        slotProps={{
          paper: { sx: { borderRadius: "12px", minWidth: "180px", mt: 1 } },
        }}
      >
        <div className="px-4 py-2 border-b border-slate-300">
          <p className="font-semibold">Select Status</p>
        </div>
        {Object.entries(STATUS_MAP).map(([name, value]) => (
          <MenuItem
            key={value}
            onClick={() =>
              updateStatus.mutate(
                { id: selectedOrder.id, status: value },
                { onSuccess: () => setStatusAnchorEl(null) },
              )
            }
            className="font-bold text-slate-700 text-[13px] py-2"
          >
            {name}
          </MenuItem>
        ))}
      </Menu>

      <DeleteConfirmationModal
        isOpen={modals.delete}
        onClose={() => !deleteOrder.isPending && toggleModal("delete")}
        onConfirm={() =>
          deleteOrder.mutate(selectedOrder.id, {
            onSuccess: () => toggleModal("delete"),
          })
        }
        itemName={selectedOrder?.orderNumber}
        isLoading={deleteOrder.isPending}
      />
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
