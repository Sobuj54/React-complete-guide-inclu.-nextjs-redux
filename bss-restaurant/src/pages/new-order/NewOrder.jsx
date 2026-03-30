import React, { useState } from "react";
import {
  Drawer,
  IconButton,
  Badge,
  TextField,
  Button,
  Box,
  Typography,
  Card,
  Paper,
  Skeleton,
} from "@mui/material";
import { ShoppingCart, X, Trash2, Users, Plus, Minus } from "lucide-react";
import { useOrderData, useOrderMutation } from "../../hooks/useNewOrder";
import ActionButton from "../../components/ActionButton";
import image from "../../assets/select_table.svg";

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
      const sellingPrice = food.discountPrice || food.price;

      if (existing) {
        return prev.map((item) =>
          item.foodId === food.id
            ? {
                ...item,
                quantity: item.quantity + 1,
                totalPrice: (item.quantity + 1) * sellingPrice,
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
          unitPrice: sellingPrice,
          quantity: 1,
          totalPrice: sellingPrice,
          foodPackageId: 0,
        },
      ];
    });
  };

  const handleQuantityChange = (id, delta) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.foodId === id) {
          const newQty = Math.max(1, item.quantity + delta);
          return {
            ...item,
            quantity: newQty,
            totalPrice: newQty * item.unitPrice,
          };
        }
        return item;
      }),
    );
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
    <Box
      sx={{
        height: "calc(100vh - 100px)",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 2,
          flex: 1,
          overflow: "hidden",
          height: "100%",
        }}
      >
        {/* LEFT: TABLES */}
        <Box
          sx={{
            width: { xs: "100%", md: "300px" },
            height: { xs: "auto", md: "100%" },
            flexShrink: 0,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          <Typography sx={{ mb: 2 }}>
            Select Table ({tablesQuery.data?.length || 0})
          </Typography>

          <Box
            sx={{
              flex: 1,
              overflowY: "auto",
              overflowX: { xs: "auto", md: "hidden" },
              pr: { md: 1 },
              display: "flex",
              flexDirection: { xs: "row", md: "column" },
              gap: 2,
              pb: 3,
              "&::-webkit-scrollbar": { width: "5px", height: "5px" },
              "&::-webkit-scrollbar-thumb": {
                bgcolor: "secondary.main",
                borderRadius: "10px",
              },
              overscrollBehavior: "contain",
            }}
          >
            {tablesQuery.isLoading
              ? Array.from(new Array(5)).map((_, index) => (
                  <Paper
                    key={index}
                    elevation={0}
                    sx={{
                      minWidth: { xs: "140px", md: "100%" },
                      p: 1.5,
                      border: "2px solid",
                      borderColor: "secondary.200",
                    }}
                  >
                    <Skeleton
                      variant="rectangular"
                      height={120}
                      sx={{ borderRadius: "5px", mb: 1.5 }}
                    />
                    <Skeleton variant="text" width="60%" sx={{ mx: "auto" }} />
                    <Skeleton variant="text" width="40%" sx={{ mx: "auto" }} />
                  </Paper>
                ))
              : tablesQuery.data?.map((table) => {
                  const isSelected = selectedTable?.id === table.id;
                  return (
                    <Paper
                      key={table.id}
                      elevation={0}
                      onClick={() => setSelectedTable(table)}
                      sx={{
                        minWidth: { xs: "140px", md: "100%" },
                        p: 1.5,
                        cursor: "pointer",
                        border: "1px solid",

                        borderColor: isSelected
                          ? "primary.main"
                          : "secondary.light",
                        bgcolor: isSelected
                          ? "primary.lighter"
                          : "background.paper",
                        transition: "all 0.2s ease",
                        "&:hover": { borderColor: "primary.light" },
                      }}
                    >
                      <Box
                        sx={{
                          height: 120,
                          borderRadius: "5px",
                          overflow: "hidden",
                          mb: 1.5,
                        }}
                      >
                        <img
                          src={`${import.meta.env.VITE_IMG_URL}/images/table/${
                            table.image
                          }`}
                          className="w-full h-full object-cover"
                          alt=""
                          onError={(e) =>
                            (e.target.src =
                              "https://images.pexels.com/photos/3758133/pexels-photo-3758133.jpeg")
                          }
                        />
                      </Box>
                      <Typography
                        sx={{
                          fontWeight: 800,
                          fontSize: "17px",
                          textAlign: "center",
                          color: isSelected ? "primary.dark" : "secondary.A200",
                        }}
                      >
                        Table {table.tableNumber}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 0.5,
                          mt: 0.5,
                        }}
                      >
                        <Users size={12} color="#8c8c8c" />
                        <Typography
                          sx={{
                            fontSize: "14px",
                            color: "secondary.main",
                            fontWeight: 600,
                          }}
                        >
                          {table.numberOfSeats} Seats
                        </Typography>
                      </Box>
                    </Paper>
                  );
                })}
          </Box>
        </Box>

        {/* RIGHT: FOOD MENU OR ILLUSTRATION */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            height: "100%",
            overflow: "hidden",
          }}
        >
          {!selectedTable ? (
            <Box
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                p: 4,
              }}
            >
              <img
                src={image}
                alt="Select Table"
                style={{ width: "280px", marginBottom: "24px" }}
                onError={(e) => {
                  e.target.src =
                    "https://illustrations.popsy.co/gray/opening-times.svg";
                }}
              />
              <Typography
                variant="h5"
                sx={{ fontWeight: 800, color: "secondary.dark", mb: 1 }}
              >
                No Table Selected
              </Typography>
              <Typography sx={{ color: "secondary.main", maxWidth: "300px" }}>
                Please select a table from the left panel to browse the food
                menu and start an order.
              </Typography>
            </Box>
          ) : (
            <>
              <Typography sx={{ mb: 2 }}>
                Food Menu ({foodsQuery.data?.length || 0}) for Table{" "}
                {selectedTable.tableNumber}
              </Typography>

              <Box
                sx={{
                  flex: 1,
                  overflowY: "auto",
                  pr: 1,
                  "&::-webkit-scrollbar": { width: "5px", height: "5px" },
                  "&::-webkit-scrollbar-thumb": {
                    bgcolor: "secondary.main",
                    borderRadius: "10px",
                  },
                  width: "full",
                  overscrollBehavior: "contain",
                }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-7 ">
                  {foodsQuery.isLoading
                    ? Array.from(new Array(9)).map((_, index) => (
                        <Card
                          key={index}
                          elevation={0}
                          sx={{
                            p: 2,
                            border: "1px solid",
                            borderColor: "secondary.200",
                            borderRadius: "5px",
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                          }}
                        >
                          <Skeleton
                            variant="rectangular"
                            height={160}
                            sx={{ borderRadius: "8px" }}
                          />
                          <Box sx={{ flex: 1 }}>
                            <Skeleton variant="text" width="80%" height={24} />
                            <Skeleton variant="text" width="100%" height={20} />
                            <Skeleton variant="text" width="40%" height={20} />
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              mt: "auto",
                            }}
                          >
                            <Skeleton variant="text" width="30%" height={32} />
                            <Skeleton
                              variant="rectangular"
                              width={100}
                              height={36}
                              sx={{ borderRadius: "5px" }}
                            />
                          </Box>
                        </Card>
                      ))
                    : foodsQuery.data
                        ?.filter((f) =>
                          f.name
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase()),
                        )
                        .map((food) => (
                          <Card
                            key={food.id}
                            elevation={0}
                            sx={{
                              p: 2,
                              border: "1px solid ",
                              borderColor: "secondary.light",
                              borderRadius: "5px",
                              display: "flex",
                              flexDirection: "column",

                              gap: 2,
                              "&:hover": {
                                boxShadow: "0 8px 24px -12px rgba(0,0,0,0.2)",
                              },
                            }}
                          >
                            <img
                              src={`${
                                import.meta.env.VITE_IMG_URL
                              }/images/food/${food.image}`}
                              className="w-full h-40 object-cover rounded-lg"
                              alt={food.name}
                            />
                            <Box sx={{ flex: 1 }}>
                              <Typography
                                sx={{
                                  fontWeight: 800,
                                  fontSize: "20px",
                                  color: "secondary.A200",
                                  mb: 0.5,
                                }}
                              >
                                {food.name}
                              </Typography>
                              <Typography
                                sx={{
                                  fontSize: "15px",
                                  color: "secondary.main",
                                  height: "36px",
                                  overflow: "hidden",
                                  display: "-webkit-box",
                                  WebkitLineClamp: 2,
                                  WebkitBoxOrient: "vertical",
                                }}
                              >
                                {food.description ||
                                  "Freshly prepared ingredients..."}
                              </Typography>
                            </Box>
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "flex-end",
                                mt: "auto",
                              }}
                            >
                              <Box>
                                {food.discountPrice < food.price && (
                                  <Typography
                                    sx={{
                                      textDecoration: "line-through",
                                      color: "error.main",
                                      fontSize: "14px",
                                      fontWeight: 600,
                                    }}
                                  >
                                    {food.price}৳
                                  </Typography>
                                )}
                                <Typography
                                  sx={{
                                    color: "success.main",
                                    fontSize: "19px",
                                    fontWeight: 900,
                                  }}
                                >
                                  {food.discountPrice || food.price}৳
                                </Typography>
                              </Box>
                              <Button
                                variant="contained"
                                onClick={() => handleAddToCart(food)}
                                sx={{
                                  bgcolor: "primary.main",
                                  color: "white",
                                  minWidth: "40px",
                                  borderRadius: "5px",
                                  fontWeight: 700,
                                  textTransform: "none",
                                }}
                              >
                                Add To Cart
                              </Button>
                            </Box>
                          </Card>
                        ))}
                </div>
              </Box>
            </>
          )}
        </Box>
      </Box>

      {/* FLOATING CART BUTTON */}
      <IconButton
        onClick={() => setIsDrawerOpen(true)}
        sx={{
          position: "fixed",
          right: 25,
          bottom: 32,
          bgcolor: "primary.main",
          color: "white",
          width: 60,
          height: 60,
          boxShadow: "0 10px 25px -5px rgba(22, 119, 255, 0.4)",
          "&:hover": { bgcolor: "primary.dark" },
        }}
      >
        <Badge
          badgeContent={cart.length}
          color="error"
          sx={{ "& .MuiBadge-badge": { fontWeight: 800 } }}
        >
          <ShoppingCart size={24} />
        </Badge>
      </IconButton>

      {/* DRAWER */}
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        PaperProps={{
          sx: { width: { xs: "100%", sm: 400 }, bgcolor: "secondary.lighter" },
        }}
      >
        <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
          <Box
            sx={{
              p: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "1px solid",
              borderColor: "divider",
            }}
          >
            <Typography sx={{ fontWeight: 800, fontSize: "18px" }}>
              Your Order
            </Typography>
            <IconButton onClick={() => setIsDrawerOpen(false)}>
              <X />
            </IconButton>
          </Box>

          <Box sx={{ flex: 1, p: 2, overflowY: "auto" }}>
            {cart.length === 0 ? (
              <Box
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: 0.5,
                }}
              >
                <ShoppingCart size={48} />
                <Typography sx={{ mt: 2, fontWeight: 700 }}>
                  Empty Cart
                </Typography>
              </Box>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <Box
                    key={item.foodId}
                    sx={{
                      display: "flex",
                      gap: 2,
                      p: 1.5,
                      bgcolor: "background.paper",
                      borderRadius: "5px",
                      border: "1px solid",
                      borderColor: "secondary.light",
                    }}
                  >
                    {/* Cart Item Image */}
                    <Box
                      sx={{
                        width: 80,
                        height: 85,
                        borderRadius: "5px",
                        overflow: "hidden",
                        flexShrink: 0,
                      }}
                    >
                      <img
                        src={`${import.meta.env.VITE_IMG_URL}/images/food/${
                          item.image
                        }`}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src =
                            "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg";
                        }}
                      />
                    </Box>

                    <Box sx={{ flex: 1 }}>
                      <Typography sx={{ fontWeight: 700, fontSize: "17px" }}>
                        {item.name}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "14px",
                          color: "secondary.main",
                          mb: 1,
                        }}
                      >
                        {item.unitPrice}৳ per unit
                      </Typography>

                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <IconButton
                          size="small"
                          onClick={() => handleQuantityChange(item.foodId, -1)}
                          sx={{
                            border: "1px solid",
                            borderColor: "secondary.200",
                            bgcolor: "background.paper",
                            p: 1,
                            borderRadius: "5px",
                          }}
                        >
                          <Minus size={14} />
                        </IconButton>
                        <Typography
                          sx={{
                            fontWeight: 800,
                            minWidth: "24px",
                            textAlign: "center",
                          }}
                        >
                          {item.quantity}
                        </Typography>
                        <IconButton
                          size="small"
                          onClick={() => handleQuantityChange(item.foodId, 1)}
                          sx={{
                            border: "1px solid",
                            borderColor: "secondary.200",
                            p: 1,
                            bgcolor: "background.paper",
                            borderRadius: "5px",
                          }}
                        >
                          <Plus size={14} />
                        </IconButton>
                      </Box>
                    </Box>
                    <Box sx={{ textAlign: "right" }}>
                      <Typography sx={{ fontWeight: 800, mb: 1 }}>
                        {item.totalPrice}৳
                      </Typography>

                      <ActionButton
                        icon={Trash2}
                        title="Delete"
                        colorType="error"
                        onClick={() => removeFromCart(item.foodId)}
                      />
                    </Box>
                  </Box>
                ))}
              </div>
            )}
          </Box>
          {cart.length > 0 && (
            <Box sx={{ p: 3, borderTop: "1px solid", borderColor: "divider" }}>
              <TextField
                fullWidth
                label="Customer Phone"
                size="small"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                sx={{ mb: 3 }}
              />
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
              >
                <Typography
                  sx={{
                    fontWeight: 600,
                    fontSize: "20px",
                  }}
                >
                  Total Amount
                </Typography>
                <Typography
                  sx={{
                    fontWeight: 900,
                    fontSize: "20px",
                    color: "primary.main",
                  }}
                >
                  {totalAmount}৳
                </Typography>
              </Box>
              <Button
                fullWidth
                variant="contained"
                size="large"
                disabled={!selectedTable}
                onClick={handleSubmit}
                sx={{
                  fontWeight: 800,
                  py: 1.5,
                  borderRadius: "5px",
                  textTransform: "none",
                }}
              >
                {selectedTable ? "Place Order" : "Select a Table First"}
              </Button>
            </Box>
          )}
        </Box>
      </Drawer>
    </Box>
  );
}
