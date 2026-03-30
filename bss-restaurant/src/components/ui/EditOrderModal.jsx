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
  Autocomplete,
  Avatar,
  CircularProgress,
  Stack,
  InputAdornment,
  useTheme,
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
import MainButton from "../MainButton"; // Integrated your custom component

export default function EditOrderModal({
  isOpen,
  onClose,
  order,
  onUpdate,
  isSubmitting,
}) {
  const theme = useTheme();
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

  const inputStyle = {
    "& .MuiOutlinedInput-root": {
      bgcolor: theme.palette.background.paper,
      borderRadius: "7px",
      "& fieldset": {
        borderColor: theme.palette.secondary.light,
        borderWidth: "1px",
      },
      "&:hover fieldset": {
        borderColor: theme.palette.secondary[400],
      },
      "&.Mui-focused fieldset": {
        borderColor: theme.palette.primary.main,
        borderWidth: "2px",
      },
    },
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          borderRadius: "5px",
          p: 1,
          bgcolor: theme.palette.background.paper,
        },
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
            sx={{
              fontWeight: 900,
              color: theme.palette.text.primary,
              fontSize: "1.2rem",
            }}
          >
            Edit Order
          </Typography>
          <Typography
            sx={{
              color: theme.palette.text.secondary,
              fontSize: "12px",
              fontWeight: 700,
            }}
          >
            ORDER NUMBER:{" "}
            <Box component="span" sx={{ color: theme.palette.primary.main }}>
              #{order?.orderNumber}
            </Box>
          </Typography>
        </Box>
        <IconButton onClick={onClose} size="medium">
          <X size={18} />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 2 }}>
        <Stack spacing={3}>
          {/* Quick Info Bar */}
          <Box sx={{ display: "flex", gap: 2 }}>
            <Box
              sx={{
                flex: 1,
                p: 2,
                bgcolor: theme.palette.background.paper,
                borderRadius: "8px",
                boxShadow: theme.shadows[1],
              }}
            >
              <Typography
                sx={{
                  fontSize: "15px",
                  fontWeight: 600,
                  color: theme.palette.secondary.main,
                  mb: 0.5,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <TableIcon size={18} /> Table
              </Typography>
              <Typography
                sx={{ fontWeight: 900, color: theme.palette.text.primary }}
              >
                {order?.table?.tableNumber || "Walk-in"}
              </Typography>
            </Box>
            <Box
              sx={{
                flex: 1,
                p: 1,
                bgcolor: theme.palette.background.paper,
                borderRadius: "8px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                boxShadow: theme.shadows[1],
              }}
            >
              <Typography
                sx={{
                  fontSize: "15px",
                  fontWeight: 600,
                  color: theme.palette.secondary.main,
                  mb: 0.5,
                  px: 1,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <Smartphone size={18} /> Phone
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
                color: theme.palette.text.primary,
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
                  sx={inputStyle}
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <InputAdornment position="start" sx={{ pl: 1 }}>
                        <Search
                          size={18}
                          color={theme.palette.secondary.main}
                        />
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
                  sx={{ display: "flex", gap: 2, p: 1 }}
                >
                  <Avatar
                    src={`${import.meta.env.VITE_IMG_URL}/images/food/${option.image}`}
                    variant="rounded"
                    sx={{ width: 40, height: 40, borderRadius: "5px" }}
                  />
                  <Box>
                    <Typography sx={{ fontWeight: 800, fontSize: "13px" }}>
                      {option.name}
                    </Typography>
                    <Typography
                      sx={{
                        color: theme.palette.primary.main,
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
              borderRadius: "5px",
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
                    backgroundColor: theme.palette.secondary.lighter,
                    borderRadius: "5px",
                  }}
                >
                  <Avatar
                    src={`${import.meta.env.VITE_IMG_URL}/images/food/${item.food?.imageUrl || item.food?.image}`}
                    variant="rounded"
                    sx={{ width: 45, height: 45, borderRadius: "7px" }}
                  />
                  <Box sx={{ flex: 1 }}>
                    <Typography
                      sx={{
                        fontWeight: 900,
                        fontSize: "13px",
                        color: theme.palette.text.primary,
                        textTransform: "uppercase",
                      }}
                    >
                      {item.food?.name}
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: 700,
                        color: theme.palette.text.secondary,
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
                          bgcolor: theme.palette.background.paper,
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
                        color: theme.palette.text.primary,
                      }}
                    >
                      {item.quantity * item.unitPrice} ৳
                    </Typography>
                    <IconButton
                      size="small"
                      onClick={() =>
                        setItems(items.filter((_, i) => i !== idx))
                      }
                      sx={{ color: theme.palette.error.light }}
                    >
                      <Trash2 size={18} />
                    </IconButton>
                  </Box>
                </Box>
              ))
            ) : (
              <Box
                sx={{
                  textAlign: "center",
                  py: 4,
                  color: theme.palette.text.disabled,
                }}
              >
                <UtensilsCrossed
                  size={40}
                  style={{ margin: "0 auto 8px auto", opacity: 0.2 }}
                />
                <Typography sx={{ fontWeight: 700, fontSize: "13px" }}>
                  No items in this order
                </Typography>
              </Box>
            )}
          </Box>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ p: 2, flexDirection: "column", gap: 2 }}>
        {/* Total Summary */}
        <Box
          sx={{
            width: "100%",
            bgcolor: theme.palette.success.main,
            p: 2,
            borderRadius: "5px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              color: "white",
              fontWeight: 600,
              fontSize: "1.1rem",
              letterSpacing: 0.5,
            }}
          >
            Total Amount
          </Typography>
          <Typography
            sx={{
              color: "white",
              fontWeight: 900,
              fontSize: "1.1rem",
            }}
          >
            {totalAmount.toLocaleString()} ৳
          </Typography>
        </Box>

        <Box sx={{ width: "100%", display: "flex", gap: 2 }}>
          <MainButton
            fullWidth
            label="Cancel"
            onClick={onClose}
            color="secondary"
          />
          <MainButton
            fullWidth
            type="submit"
            onClick={handleSubmit}
            disabled={isSubmitting || items.length === 0}
            isLoading={isSubmitting}
            label="Update Order"
            color="primary"
          />
        </Box>
      </DialogActions>
    </Dialog>
  );
}
