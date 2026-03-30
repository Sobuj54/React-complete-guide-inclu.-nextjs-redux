import { useState } from "react";
import { Plus, Trash2, Search, Edit2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  CircularProgress,
  Box,
  Typography,
  useTheme,
  TextField,
  InputAdornment,
  Stack,
} from "@mui/material";

import { useFoods, useFood, useFoodMutations } from "../../hooks/useFoods";
import { toBase64 } from "../../utils/to-base64";

// Components
import DeleteConfirmationModal from "../../components/ui/DeleteConfirmationModal";
import Modal from "../../components/ui/Modal";
import FoodForm from "../../components/ui/FoodForm";
import ActionButton from "../../components/ActionButton";
import MainButton from "../../components/MainButton";

export default function Foods() {
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFoodId, setSelectedFoodId] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [foodToDelete, setFoodToDelete] = useState(null);

  // API Hooks
  const {
    data: response,
    isPending,
    refetch,
  } = useFoods(page + 1, perPage, search);

  const { data: fullFoodData, isFetching: isFetchingSingle } =
    useFood(selectedFoodId);

  const { createFood, updateFood, deleteFood } =
    useFoodMutations(selectedFoodId);

  const onFormSubmit = async (data) => {
    try {
      const hasNewFile = data.image && data.image[0] instanceof File;

      let payload = {
        name: data.name,
        description: data.description,
        price: Number(data.price) || 0,
        discountType: data.discountType || "None",
        discount: Number(data.discount) || 0,
        image: "",
        base64: "",
      };

      if (hasNewFile) {
        const file = data.image[0];
        payload.image = file.name;
        payload.base64 = await toBase64(file);
      } else if (typeof data.image === "string") {
        payload.image = data.image;
      }

      const options = {
        onSuccess: () => {
          setIsModalOpen(false);
          setSelectedFoodId(null);
          refetch();
        },
      };

      if (selectedFoodId) {
        updateFood.mutate(payload, options);
      } else {
        createFood.mutate(payload, options);
      }
    } catch (error) {
      console.error("Form Submission Error:", error);
    }
  };

  const tableStyle = {
    py: 1.5,
    whiteSpace: "nowrap", // Prevent text wrapping in header
  };

  const bodyCellStyle = {
    py: 0,
    whiteSpace: "nowrap", // Prevent text wrapping in body
  };

  return (
    <div className="space-y-4">
      <title>BSS Resto | Foods</title>

      <Box
        sx={{
          mb: 3,
          display: "flex",
          justifyContent: "end",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          sx={{ width: { xs: "100%", md: "auto" } }}
        >
          <TextField
            size="small"
            placeholder="Search Foods..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
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
          <MainButton
            label="Add Food"
            startIcon={<Plus size={18} />}
            onClick={() => {
              setSelectedFoodId(null);
              setIsModalOpen(true);
            }}
            color="primary"
          />
        </Stack>
      </Box>

      <TableContainer
        component={Paper}
        variant="outlined"
        sx={{
          borderRadius: `${theme.shape.borderRadius}px`,
          borderColor: theme.palette.secondary.light,
          boxShadow: "none",
          overflowX: "auto", // Enable horizontal scrolling
        }}
      >
        <Table size="small" sx={{ minWidth: 800 }}>
          <TableHead
            sx={{
              bgcolor: "#f8fafc",
            }}
          >
            <TableRow>
              <TableCell sx={tableStyle}>Image</TableCell>
              <TableCell sx={tableStyle}>Name</TableCell>
              <TableCell align="center" sx={tableStyle}>
                Discount
              </TableCell>
              <TableCell sx={tableStyle}>Base Price</TableCell>
              <TableCell sx={tableStyle}>Final Price</TableCell>
              <TableCell align="right" sx={tableStyle}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isPending ? (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 10 }}>
                  <CircularProgress
                    size={30}
                    sx={{ color: theme.palette.primary.main }}
                  />
                </TableCell>
              </TableRow>
            ) : (
              response?.data?.map((food) => (
                <TableRow key={food.id} hover>
                  <TableCell sx={bodyCellStyle}>
                    <img
                      src={`${import.meta.env.VITE_IMG_URL}/images/food/${food.image}`}
                      className="w-10 h-10 object-cover border border-slate-100"
                      style={{ borderRadius: "4px" }}
                      alt={food.name}
                    />
                  </TableCell>
                  <TableCell sx={bodyCellStyle}>
                    <Typography variant="body2" sx={{ fontWeight: 600, m: 0 }}>
                      {food.name}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "11px",
                        color: theme.palette.secondary.main,
                      }}
                      className="line-clamp-1 m-0"
                    >
                      {food.description}
                    </Typography>
                  </TableCell>
                  <TableCell align="center" sx={bodyCellStyle}>
                    {food.discountType !== "None" ? (
                      <Box
                        sx={{
                          bgcolor: theme.palette.error.lighter,
                          color: theme.palette.error.main,
                          border: `1px solid ${theme.palette.error.light}`,
                          px: 1,
                          py: 0.2,
                          borderRadius: "3px",
                          display: "inline-block",
                          fontSize: "10px",
                          fontWeight: 800,
                        }}
                      >
                        {food.discount}
                        {food.discountType === "Percentage" ? "%" : "৳"} OFF
                      </Box>
                    ) : (
                      <span className="text-slate-400 text-xs">N/A</span>
                    )}
                  </TableCell>
                  <TableCell
                    sx={{
                      ...bodyCellStyle,
                      fontWeight: 600,
                      fontSize: "13px",
                    }}
                  >
                    {food.price}৳
                  </TableCell>
                  <TableCell
                    sx={{
                      ...bodyCellStyle,
                      fontWeight: 600,
                      color: theme.palette.success.main,
                      fontSize: "15px",
                    }}
                  >
                    {food.discountPrice}৳
                  </TableCell>
                  <TableCell align="right" sx={{ py: 1 }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        gap: 1,
                      }}
                    >
                      <ActionButton
                        icon={Edit2}
                        title="Edit Item"
                        colorType="primary"
                        onClick={() => {
                          setSelectedFoodId(food.id);
                          setIsModalOpen(true);
                        }}
                      />
                      <ActionButton
                        icon={Trash2}
                        title="Delete Item"
                        colorType="error"
                        onClick={() => {
                          setFoodToDelete(food);
                          setIsDeleteModalOpen(true);
                        }}
                      />
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={response?.total || 0}
          page={page}
          onPageChange={(_, newPage) => setPage(newPage)}
          rowsPerPage={perPage}
          onRowsPerPageChange={(e) => {
            setPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
          // Maintained desktop settings & scrollable container
          rowsPerPageOptions={[5, 10, 25]}
          labelRowsPerPage="Rows per page:"
          sx={{
            minWidth: 800,
            borderTop: "1px solid #f0f0f0",
          }}
        />
      </TableContainer>

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() =>
          deleteFood.mutate(foodToDelete.id, {
            onSuccess: () => setIsDeleteModalOpen(false),
          })
        }
        itemName={foodToDelete?.name}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedFoodId(null);
        }}
        title={selectedFoodId ? "Edit Menu Item" : "Add Food Item"}
        style="max-w-4xl"
      >
        {selectedFoodId && isFetchingSingle ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              py: 10,
              gap: 2,
            }}
          >
            <CircularProgress
              size={24}
              sx={{ color: theme.palette.primary.main }}
            />
            <Typography
              sx={{
                fontSize: "10px",
                fontWeight: 900,
                color: "text.secondary",
                textTransform: "uppercase",
                letterSpacing: 1,
              }}
            >
              Loading Item Details...
            </Typography>
          </Box>
        ) : (
          <FoodForm
            defaultValues={fullFoodData}
            onSubmit={onFormSubmit}
            onCancel={() => setIsModalOpen(false)}
            isLoading={createFood.isPending || updateFood.isPending}
          />
        )}
      </Modal>
    </div>
  );
}
