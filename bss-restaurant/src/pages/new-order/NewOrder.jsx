import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  IconButton,
  Badge,
  Drawer,
  Button,
  Avatar,
  Grid,
  Stack,
  InputAdornment,
  Skeleton,
} from "@mui/material";
import {
  Search,
  ShoppingCart,
  X,
  ShoppingBasket,
  Trash2,
  ArrowRight,
  User,
} from "lucide-react";
import { useOrderData, useOrderMutation } from "../../hooks/useNewOrder";

export default function NewOrderPage() {
  const [selectedTable, setSelectedTable] = useState(null);
  const [cart, setCart] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const { tablesQuery, foodsQuery } = useOrderData(selectedTable?.id);
  const orderMutation = useOrderMutation();

  const handleAddToCart = (food) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.foodId === food.id);
      if (existing) {
        return prev.map((item) =>
          item.foodId === food.id
            ? {
                ...item,
                quantity: item.quantity + 1,
                totalPrice: (item.quantity + 1) * food.price,
              }
            : item,
        );
      }
      return [
        ...prev,
        {
          foodId: food.id,
          name: food.name,
          image: food.image,
          unitPrice: food.price,
          quantity: 1,
          totalPrice: food.price,
          foodPackageId: 0,
        },
      ];
    });
  };

  const removeFromCart = (id) =>
    setCart(cart.filter((item) => item.foodId !== id));
  const totalAmount = cart.reduce((sum, item) => sum + item.totalPrice, 0);

  const handleSubmit = () => {
    const payload = {
      tableId: selectedTable.id,
      orderNumber: `ORD-${Date.now()}`,
      amount: totalAmount,
      phoneNumber: phone,
      items: cart.map(({ name, image, ...rest }) => rest),
    };
    orderMutation.mutate(payload, {
      onSuccess: () => {
        setCart([]);
        setSelectedTable(null);
        setIsDrawerOpen(false);
        setPhone("");
      },
    });
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f1f1f1", p: 3 }}>
      {/* Top Bar - Matches Image Search style */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 3 }}>
        <Stack direction="row" spacing={0}>
          <TextField
            placeholder="Search Food"
            size="small"
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{
              width: 250,
              "& .MuiOutlinedInput-root": {
                bgcolor: "white",
                borderRadius: "4px 0 0 4px",
                height: 35,
                fontSize: "13px",
              },
            }}
          />
          <Button
            variant="contained"
            disableElevation
            sx={{
              bgcolor: "#5cb85c",
              minWidth: 40,
              borderRadius: "0 4px 4px 0",
              height: 35,
              "&:hover": { bgcolor: "#4cae4c" },
            }}
          >
            <Search size={18} />
          </Button>
        </Stack>
      </Box>

      <Grid container spacing={3}>
        {/* LEFT: Table Selection */}
        <Grid item xs={12} md={3}>
          <Typography
            align="center"
            sx={{ fontWeight: 700, mb: 2, fontSize: "14px", color: "#333" }}
          >
            SELECT A TABLE ({tablesQuery.data?.length || 0})
          </Typography>
          <Stack spacing={2}>
            {tablesQuery.isLoading
              ? [1, 2, 3].map((i) => (
                  <Skeleton
                    key={i}
                    variant="rectangular"
                    height={150}
                    sx={{ borderRadius: "8px" }}
                  />
                ))
              : tablesQuery.data?.map((table) => (
                  <Box
                    key={table.id}
                    onClick={() => setSelectedTable(table)}
                    sx={{
                      bgcolor: "white",
                      border: `1px solid ${selectedTable?.id === table.id ? "#5cb85c" : "#ccc"}`,
                      borderRadius: "8px",
                      p: 2,
                      cursor: "pointer",
                      textAlign: "center",
                      transition: "all 0.2s",
                      "&:hover": { borderColor: "#5cb85c" },
                    }}
                  >
                    <Box
                      sx={{
                        bgcolor: "#eee",
                        borderRadius: "8px",
                        height: 100,
                        mb: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        overflow: "hidden",
                      }}
                    >
                      <img
                        src={`https://bssrms.runasp.net/images/table/${table.image}`}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                        alt=""
                        onError={(e) =>
                          (e.target.src = "https://via.placeholder.com/150")
                        }
                      />
                    </Box>
                    <Typography sx={{ fontSize: "13px", color: "#333" }}>
                      {table.tableNumber} ({table.numberOfSeats} Seats)
                    </Typography>
                  </Box>
                ))}
          </Stack>
        </Grid>

        {/* RIGHT: Food Menu */}
        <Grid item xs={12} md={9} sx={{ position: "relative" }}>
          <Typography
            sx={{ fontWeight: 700, mb: 2, fontSize: "14px", color: "#333" }}
          >
            ADD FOOD TO CART ({foodsQuery.data?.length || 0})
          </Typography>

          <Stack spacing={2}>
            {foodsQuery.isLoading
              ? [1, 2].map((i) => (
                  <Skeleton
                    key={i}
                    variant="rectangular"
                    height={120}
                    sx={{ borderRadius: "8px" }}
                  />
                ))
              : foodsQuery.data
                  ?.filter((f) =>
                    f.name.toLowerCase().includes(searchTerm.toLowerCase()),
                  )
                  .map((food) => (
                    <Box
                      key={food.id}
                      sx={{
                        bgcolor: "white",
                        border: "1px solid #5cb85c",
                        borderRadius: "8px",
                        p: 2,
                        display: "flex",
                        alignItems: "center",
                        gap: 3,
                      }}
                    >
                      <Avatar
                        variant="rounded"
                        src={`https://bssrms.runasp.net/images/food/${food.image}`}
                        sx={{ width: 120, height: 100, borderRadius: "8px" }}
                      />
                      <Box sx={{ flex: 1 }}>
                        <Typography
                          sx={{
                            fontWeight: 800,
                            fontSize: "18px",
                            color: "#333",
                          }}
                        >
                          {food.name}
                        </Typography>
                        <Typography
                          sx={{ fontSize: "13px", color: "#666", mb: 2 }}
                        >
                          {food.description || food.name}
                        </Typography>

                        {food.price < food.originalPrice && (
                          <Typography
                            sx={{
                              fontSize: "14px",
                              color: "#c00",
                              textDecoration: "line-through",
                              lineHeight: 1,
                            }}
                          >
                            Price - {food.originalPrice}৳
                          </Typography>
                        )}
                        <Typography
                          sx={{
                            fontSize: "18px",
                            fontWeight: 700,
                            color: "#449d44",
                          }}
                        >
                          Price - {food.price}৳!
                        </Typography>
                      </Box>
                      <Button
                        variant="contained"
                        onClick={() => handleAddToCart(food)}
                        sx={{
                          bgcolor: "#449d44",
                          textTransform: "none",
                          fontWeight: 700,
                          fontSize: "12px",
                          px: 3,
                          "&:hover": { bgcolor: "#398439" },
                        }}
                      >
                        Add To Cart
                      </Button>
                    </Box>
                  ))}
          </Stack>

          {/* Floating Cart Trigger - Matches Screenshot 1 */}
          <Box
            onClick={() => setIsDrawerOpen(true)}
            sx={{
              position: "fixed",
              right: 40,
              top: "50%",
              transform: "translateY(-50%)",
              bgcolor: "white",
              p: 1.5,
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              cursor: "pointer",
              border: "1px solid #ddd",
              zIndex: 10,
            }}
          >
            <Badge badgeContent={cart.length} color="error">
              <ShoppingBasket size={30} color="#333" />
            </Badge>
          </Box>
        </Grid>
      </Grid>

      {/* CART DRAWER - Matches Screenshot 2 */}
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        PaperProps={{ sx: { width: { xs: "100%", sm: 450 } } }}
      >
        <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
          <Box
            sx={{
              p: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "1px solid #5cb85c",
            }}
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <ShoppingCart size={20} color="#5cb85c" />
              <Typography
                sx={{ fontWeight: 700, color: "#5cb85c", fontSize: "18px" }}
              >
                Order Cart
              </Typography>
            </Stack>
            <IconButton onClick={() => setIsDrawerOpen(false)}>
              <X size={24} />
            </IconButton>
          </Box>

          <Box
            sx={{
              flex: 1,
              p: 4,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {cart.length === 0 ? (
              <Typography sx={{ fontSize: "24px", color: "#555" }}>
                The Cart Is Empty!
              </Typography>
            ) : (
              <Stack
                spacing={2}
                sx={{ width: "100%", alignSelf: "flex-start" }}
              >
                {cart.map((item) => (
                  <Box
                    key={item.foodId}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      p: 2,
                      bgcolor: "#f9f9f9",
                      borderRadius: "4px",
                    }}
                  >
                    <Box>
                      <Typography sx={{ fontWeight: 700 }}>
                        {item.name}
                      </Typography>
                      <Typography sx={{ fontSize: "12px" }}>
                        {item.quantity} x {item.unitPrice}৳
                      </Typography>
                    </Box>
                    <IconButton
                      color="error"
                      onClick={() => removeFromCart(item.foodId)}
                    >
                      <Trash2 size={18} />
                    </IconButton>
                  </Box>
                ))}
              </Stack>
            )}
          </Box>

          {cart.length > 0 && (
            <Box sx={{ p: 3, borderTop: "1px solid #eee" }}>
              <TextField
                fullWidth
                label="Customer Phone"
                size="small"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                sx={{ mb: 2 }}
              />
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
              >
                <Typography sx={{ fontWeight: 700 }}>Total:</Typography>
                <Typography sx={{ fontWeight: 700, color: "#449d44" }}>
                  {totalAmount}৳
                </Typography>
              </Box>
              <Button
                fullWidth
                variant="contained"
                onClick={handleSubmit}
                sx={{
                  bgcolor: "#5cb85c",
                  "&:hover": { bgcolor: "#4cae4c" },
                  py: 1.5,
                  fontWeight: 700,
                }}
              >
                Confirm Order
              </Button>
            </Box>
          )}
        </Box>
      </Drawer>
    </Box>
  );
}
