import React, { useState, useEffect, useMemo } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  Box,
  TextField,
  Button,
  Autocomplete,
  Avatar,
  CircularProgress,
  Stack,
  InputAdornment,
} from "@mui/material";
import {
  X,
  Trash2,
  Search,
  UtensilsCrossed,
  Smartphone,
  Table as TableIcon,
} from "lucide-react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

export default function EditOrderModal({
  isOpen,
  onClose,
  order,
  onUpdate,
  isSubmitting,
}) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [items, setItems] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [loadingFood, setLoadingFood] = useState(false);
  const axiosSecure = useAxiosSecure();

  // Fetch Food Data
  useEffect(() => {
    if (isOpen) {
      const fetchFood = async () => {
        setLoadingFood(true);
        try {
          const { data } = await axiosSecure.get("/Food/datatable");
          setFoodItems(data.data || []);
        } catch (error) {
          console.error(error);
        } finally {
          setLoadingFood(false);
        }
      };
      fetchFood();
    }
  }, [isOpen, axiosSecure]);

  // Sync Order Data
  useEffect(() => {
    if (order && isOpen) {
      setPhoneNumber(order.orderedBy?.phoneNumber || "");
      setItems(order.orderItems || []);
    }
  }, [order, isOpen]);

  const totalAmount = useMemo(
    () => items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0),
    [items],
  );

  const handleAddItem = (foodToAdd) => {
    if (!foodToAdd) return;
    const existingIndex = items.findIndex(
      (item) => (item.food?.id || item.foodId) === foodToAdd.id,
    );

    if (existingIndex > -1) {
      const updated = [...items];
      updated[existingIndex].quantity += 1;
      updated[existingIndex].totalPrice =
        updated[existingIndex].quantity * updated[existingIndex].unitPrice;
      setItems(updated);
    } else {
      setItems([
        {
          foodId: foodToAdd.id,
          food: {
            id: foodToAdd.id,
            name: foodToAdd.name,
            imageUrl: foodToAdd.image,
          },
          quantity: 1,
          unitPrice: foodToAdd.price,
          totalPrice: foodToAdd.price,
        },
        ...items,
      ]);
    }
  };

  const handleQtyChange = (index, val) => {
    const updated = [...items];
    const newQty = Math.max(1, Number(val));
    updated[index] = {
      ...updated[index],
      quantity: newQty,
      totalPrice: newQty * updated[index].unitPrice,
    };
    setItems(updated);
  };

  const handleSubmit = () => {
    if (items.length === 0) return;
    const payload = {
      tableId: order.table?.tableId || order.tableId || 0,
      orderNumber: order.orderNumber,
      amount: totalAmount,
      phoneNumber,
      items: items.map((item) => ({
        foodId: item.food?.id || item.foodId,
        foodPackageId: item.foodPackageId || 0,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        totalPrice: item.quantity * item.unitPrice,
      })),
    };
    onUpdate({ id: order.id, payload });
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: { borderRadius: "7px", p: 1, bgcolor: "#f8fafc" },
      }}
    >
      {/* Header */}
      <DialogTitle
        sx={{
          p: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography
            sx={{ fontWeight: 900, color: "#0f172a", fontSize: "1.1rem" }}
          >
            Edit Order
          </Typography>
          <Typography
            sx={{ color: "#64748b", fontSize: "12px", fontWeight: 700 }}
          >
            ORDER NUMBER:{" "}
            <span className="text-orange-500">#{order?.orderNumber}</span>
          </Typography>
        </Box>
        <IconButton
          onClick={onClose}
          size="small"
          sx={{ bgcolor: "white", borderRadius: "7px" }}
        >
          <X size={18} />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 2 }}>
        <Stack spacing={3}>
          {/* Quick Info Bar */}
          <Box sx={{ display: "flex", gap: 2 }}>
            <Box sx={{ flex: 1, p: 2, bgcolor: "white", borderRadius: "7px" }}>
              <Typography
                sx={{
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "#94a3b8",
                  mb: 0.5,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <TableIcon size={12} /> Table
              </Typography>
              <Typography sx={{ fontWeight: 900, color: "#0f172a" }}>
                {order?.table?.tableNumber || "Walk-in"}
              </Typography>
            </Box>
            <Box
              sx={{
                flex: 1,
                p: 1,
                bgcolor: "white",
                borderRadius: "7px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Typography
                sx={{
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "#94a3b8",
                  mb: 0.5,
                  px: 1,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <Smartphone size={12} /> Phone
              </Typography>
              <TextField
                variant="standard"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                InputProps={{
                  disableUnderline: true,
                  sx: { px: 1, fontWeight: 700, fontSize: "14px" },
                }}
                fullWidth
              />
            </Box>
          </Box>

          {/* Search/Add Food */}
          <Box>
            <Typography
              sx={{
                fontSize: "13px",
                fontWeight: 600,
                mb: 1,
                px: 1,
              }}
            >
              Add Items To Order
            </Typography>
            <Autocomplete
              options={foodItems}
              getOptionLabel={(option) => option.name}
              onChange={(_, newValue) => handleAddItem(newValue)}
              loading={loadingFood}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Search for food..."
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      bgcolor: "white",
                      borderRadius: "7px",
                      border: "1px solid oklch(55.4% 0.046 257.417)",
                      "& fieldset": { border: "none" },
                    },
                  }}
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <InputAdornment position="start" sx={{ pl: 1 }}>
                        <Search size={18} className="text-slate-400" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <>
                        {loadingFood ? (
                          <CircularProgress color="inherit" size={20} />
                        ) : null}
                        {params.InputProps.endAdornment}
                      </>
                    ),
                  }}
                />
              )}
              renderOption={(props, option) => (
                <Box
                  component="li"
                  {...props}
                  sx={{
                    display: "flex",
                    gap: 2,
                    p: 1,
                  }}
                >
                  <Avatar
                    src={`https://bssrms.runasp.net/images/food/${option.image}`}
                    variant="rounded"
                    sx={{ width: 40, height: 40, borderRadius: "5px" }}
                  />
                  <Box>
                    <Typography sx={{ fontWeight: 800, fontSize: "13px" }}>
                      {option.name}
                    </Typography>
                    <Typography
                      sx={{
                        color: "orange",
                        fontWeight: 900,
                        fontSize: "11px",
                      }}
                    >
                      {option.price} ৳
                    </Typography>
                  </Box>
                </Box>
              )}
            />
          </Box>

          {/* Items List */}
          <Box
            sx={{
              borderRadius: "7px",
              p: 1,
              maxHeight: 300,
              overflowY: "auto",
            }}
          >
            {items.length > 0 ? (
              items.map((item, idx) => (
                <Box
                  key={idx}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    p: 1.5,
                    mb: 1,
                    backgroundColor: "oklch(96.8% 0.007 247.896)",
                    borderRadius: "7px",
                  }}
                >
                  <Avatar
                    src={`https://bssrms.runasp.net/images/food/${item.food?.imageUrl || item.food?.image}`}
                    variant="rounded"
                    sx={{ width: 45, height: 45, borderRadius: "7px" }}
                  />
                  <Box sx={{ flex: 1 }}>
                    <Typography
                      sx={{
                        fontWeight: 900,
                        fontSize: "13px",
                        color: "#0f172a",
                        textTransform: "uppercase",
                      }}
                    >
                      {item.food?.name}
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: 700,
                        color: "#64748b",
                        fontSize: "11px",
                      }}
                    >
                      {item.unitPrice} ৳ / unit
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <TextField
                      type="number"
                      size="small"
                      value={item.quantity}
                      onChange={(e) => handleQtyChange(idx, e.target.value)}
                      inputProps={{
                        style: {
                          textAlign: "center",
                          fontWeight: 900,
                          fontSize: "12px",
                        },
                      }}
                      sx={{
                        width: 60,
                        "& .MuiOutlinedInput-root": {
                          bgcolor: "white",
                          borderRadius: "5px",
                          "& fieldset": { border: "none" },
                        },
                      }}
                    />
                    <Typography
                      sx={{
                        minWidth: 60,
                        fontWeight: 900,
                        fontSize: "14px",
                        textAlign: "right",
                      }}
                    >
                      {item.quantity * item.unitPrice} ৳
                    </Typography>
                    <IconButton
                      size="small"
                      onClick={() =>
                        setItems(items.filter((_, i) => i !== idx))
                      }
                      sx={{ color: "#fca5a5" }}
                    >
                      <Trash2 size={18} />
                    </IconButton>
                  </Box>
                </Box>
              ))
            ) : (
              <Box sx={{ textAlign: "center", py: 4, color: "#94a3b8" }}>
                <UtensilsCrossed
                  size={40}
                  className="mx-auto mb-2 opacity-20"
                />
                <Typography sx={{ fontWeight: 700, fontSize: "13px" }}>
                  No items in this order
                </Typography>
              </Box>
            )}
          </Box>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ p: 2, flexDirection: "column", gap: 1.5 }}>
        {/* Total Summary */}
        <Box
          sx={{
            width: "100%",
            bgcolor: "oklch(44.6% 0.043 257.281)",
            p: 2,
            borderRadius: "7px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              color: "white",
              fontWeight: 600,
              fontSize: "13px",
              letterSpacing: 1,
            }}
          >
            Total Amount
          </Typography>
          <Typography
            sx={{ color: "#fb923c", fontWeight: 900, fontSize: "1.2rem" }}
          >
            {totalAmount.toLocaleString()} ৳
          </Typography>
        </Box>

        <Box sx={{ width: "100%", display: "flex", gap: 2 }}>
          <Button
            fullWidth
            onClick={onClose}
            sx={{
              py: 1.5,
              color: "#64748b",
              fontWeight: 900,
              bgcolor: "white",
              borderRadius: "7px",
              textTransform: "none",
            }}
          >
            Cancel
          </Button>
          <Button
            fullWidth
            onClick={handleSubmit}
            disabled={isSubmitting || items.length === 0}
            variant="contained"
            sx={{
              py: 1.5,
              bgcolor: "#f97316",
              borderRadius: "7px",
              fontWeight: 900,
              textTransform: "none",
              boxShadow: "none",
              "&:hover": { bgcolor: "#ea580c", boxShadow: "none" },
            }}
          >
            {isSubmitting ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              "Update Order"
            )}
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
}
