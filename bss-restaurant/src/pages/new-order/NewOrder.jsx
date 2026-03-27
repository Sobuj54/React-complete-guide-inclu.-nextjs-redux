import React, { useState } from "react";
import { Drawer, IconButton, Badge, TextField, Button } from "@mui/material";
import { ShoppingCart, X, Trash2 } from "lucide-react";
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
    <div className="min-h-screen  p-4 md:p-6">
      {/* SEARCH */}
      <div className="flex justify-end mb-6">
        <input
          type="text"
          placeholder="Search Food"
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-xs px-3 bg-white py-2 border rounded-md text-sm outline-none"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* LEFT: TABLES */}
        <div className="md:col-span-3">
          <h2 className="text-md font-medium text-center md:text-center mb-4">
            SELECT A TABLE ({tablesQuery.data?.length || 0})
          </h2>

          <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-visible">
            {tablesQuery.data?.map((table) => {
              const isSelected = selectedTable?.id === table.id;

              return (
                <div
                  key={table.id}
                  onClick={() => setSelectedTable(table)}
                  className={`min-w-[140px] md:min-w-0 p-3 rounded-md cursor-pointer border-2 transition
                    ${
                      isSelected
                        ? "border-green-500 bg-green-50"
                        : "border-gray-200 bg-white"
                    }`}
                >
                  <div className="h-32 bg-gray-100 rounded-md overflow-hidden mb-2">
                    <img
                      src={`https://bssrms.runasp.net/images/table/${table.image}`}
                      className="w-full h-full object-cover"
                      alt=""
                      onError={(e) =>
                        (e.target.src =
                          "https://images.pexels.com/photos/3758133/pexels-photo-3758133.jpeg?_gl=1*btgiuz*_ga*MTEyMzE5NjgyMi4xNzY5MDgyNDM0*_ga_8JE65Q40S6*czE3NzQzNTc5NjEkbzkkZzEkdDE3NzQzNTc5NjQkajU3JGwwJGgw")
                      }
                    />
                  </div>
                  <p className="text-sm font-bold text-center">
                    {table.tableNumber}
                  </p>
                  <p className="text-xs text-gray-500 text-center">
                    ({table.numberOfSeats} Seats)
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT: FOOD */}
        <div className="md:col-span-9">
          <h2 className="text-md font-medium mb-4">
            ADD FOOD TO CART ({foodsQuery.data?.length || 0})
          </h2>

          {/* ✅ GRID FIX HERE */}
          <div className="grid grid-cols-1 gap-4">
            {foodsQuery.data
              ?.filter((f) =>
                f.name.toLowerCase().includes(searchTerm.toLowerCase()),
              )
              .map((food) => (
                <div
                  key={food.id}
                  className="bg-white shadow-md rounded-md p-4 flex flex-col sm:flex-row gap-8"
                >
                  <img
                    src={`https://bssrms.runasp.net/images/food/${food.image}`}
                    className="w-full sm:w-36 h-40 sm:h-28 object-cover rounded-md"
                    alt=""
                  />

                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="font-medium text-lg">{food.name}</h3>
                    <p className="text-sm text-gray-500 mb-2">
                      {food.description || "No description"}
                    </p>

                    <div className=" ">
                      {food.discountPrice < food.price && (
                        <p className="line-through text-red-500 text-sm font-bold">
                          Price {food.price}৳
                        </p>
                      )}
                      <p className="text-green-500 text-lg font-bold">
                        Price {food.discountPrice || food.price}৳
                      </p>
                    </div>
                  </div>

                  <div>
                    <button
                      onClick={() => handleAddToCart(food)}
                      className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-4 py-2 rounded-md w-full sm:w-auto cursor-pointer"
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* FLOATING CART */}
      <div
        onClick={() => setIsDrawerOpen(true)}
        className="fixed right-4 top-1/2 -translate-y-1/2 bg-white p-3 rounded-md shadow-lg  cursor-pointer"
      >
        <Badge badgeContent={cart.length} color="error">
          <ShoppingCart size={22} />
        </Badge>
      </div>

      {/* DRAWER (MUI kept) */}
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        PaperProps={{ sx: { width: { xs: "100%", sm: 400 } } }}
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="font-bold text-lg">Order Cart</h2>
            <IconButton onClick={() => setIsDrawerOpen(false)}>
              <X />
            </IconButton>
          </div>

          {/* Items */}
          <div className="flex-1 p-4 overflow-y-auto">
            {cart.length === 0 ? (
              <p className="text-center text-gray-500 mt-10">Cart is empty</p>
            ) : (
              <div className="space-y-3">
                {cart.map((item) => (
                  <div
                    key={item.foodId}
                    className="flex justify-between bg-gray-100 p-3 rounded-md"
                  >
                    <div>
                      <p className="font-bold">{item.name}</p>
                      <p className="text-xs text-gray-500">
                        {item.quantity} x {item.unitPrice}৳
                      </p>
                    </div>
                    <IconButton
                      color="error"
                      onClick={() => removeFromCart(item.foodId)}
                    >
                      <Trash2 size={16} />
                    </IconButton>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {cart.length > 0 && (
            <div className="p-4 border-t">
              <TextField
                fullWidth
                label="Phone"
                size="small"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                sx={{ mb: 2 }}
              />

              <Button
                fullWidth
                variant="contained"
                onClick={handleSubmit}
                sx={{ color: "white" }}
              >
                Confirm ({totalAmount}৳)
              </Button>
            </div>
          )}
        </div>
      </Drawer>
    </div>
  );
}
