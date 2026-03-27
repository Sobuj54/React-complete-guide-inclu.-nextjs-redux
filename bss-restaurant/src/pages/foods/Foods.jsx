import { useState } from "react";
import { Plus, Edit3, Trash2, Search } from "lucide-react";
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
} from "@mui/material";

import { useFoods, useFood, useFoodMutations } from "../../hooks/useFoods";
import { toBase64 } from "../../utils/to-base64";

// Components
import DeleteConfirmationModal from "../../components/ui/DeleteConfirmationModal";
import Modal from "../../components/ui/Modal";
import FoodForm from "../../components/ui/FoodForm";

export default function Foods() {
  const [page, setPage] = useState(0); // MUI uses 0-based indexing for pagination
  const [perPage, setPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFoodId, setSelectedFoodId] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [foodToDelete, setFoodToDelete] = useState(null);

  // API Hooks (Adjusting page + 1 for your backend if it's 1-based)
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
      // Check if a new file is actually selected in the file input
      const hasNewFile = data.image && data.image[0] instanceof File;

      // 1. Initialize payload with all fields matching Swagger format
      // Ensure numbers are Numbers and strings are Strings
      let payload = {
        name: data.name,
        description: data.description,
        price: Number(data.price) || 0,
        discountType: data.discountType || "None",
        discount: Number(data.discount) || 0,
        image: "", // Swagger expects a string
        base64: "", // Swagger expects a string
      };

      // 2. Handle Image/Base64 logic
      if (hasNewFile) {
        const file = data.image[0];
        payload.image = file.name;
        payload.base64 = await toBase64(file);
      } else if (typeof data.image === "string") {
        // Logic for Edit mode: keep existing image name if no new file uploaded
        payload.image = data.image;
      }

      console.log(payload);

      const options = {
        onSuccess: () => {
          setIsModalOpen(false);
          setSelectedFoodId(null);
          refetch();
        },
      };

      // 3. Mutation Execution
      if (selectedFoodId) {
        updateFood.mutate(payload, options);
      } else {
        createFood.mutate(payload, options);
      }
    } catch (error) {
      console.error("Form Submission Error:", error);
    }
  };

  return (
    <div className="space-y-4 pt-2">
      <title>BSS Resto | Foods</title>

      <div className="flex flex-col md:flex-row md:items-center justify-end gap-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={16}
            />
            <input
              type="text"
              placeholder="Search food..."
              className="pl-10 pr-4 py-2 bg-white outline-none rounded-[5px] font-bold text-sm transition-all"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button
            onClick={() => {
              setSelectedFoodId(null);
              setIsModalOpen(true);
            }}
            className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-[5px] font-bold hover:bg-orange-600 transition-all active:scale-95"
          >
            <Plus size={18} strokeWidth={3} /> Add Food
          </button>
        </div>
      </div>

      <TableContainer
        component={Paper}
        variant="outlined"
        sx={{ borderRadius: "5px", border: "1px solid #e2e8f0" }}
      >
        <Table>
          <TableHead sx={{ backgroundColor: "#f8fafc" }}>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Name</TableCell>
              <TableCell align="center">Discount</TableCell>
              <TableCell>Base Price</TableCell>
              <TableCell>Final Price</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isPending ? (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 10 }}>
                  <CircularProgress size={30} sx={{ color: "#ea580c" }} />
                </TableCell>
              </TableRow>
            ) : (
              response?.data?.map((food) => (
                <TableRow key={food.id} hover>
                  <TableCell sx={{ py: 0 }}>
                    <img
                      src={`https://bssrms.runasp.net/images/food/${food.image}`}
                      className="w-12 h-12 object-cover border border-slate-100"
                      style={{ borderRadius: "5px" }}
                      alt={food.name}
                    />
                  </TableCell>
                  <TableCell>
                    <p className="font-medium m-0">{food.name}</p>
                    <p className="text-[11px] text-slate-400 line-clamp-1 m-0">
                      {food.description}
                    </p>
                  </TableCell>
                  <TableCell align="center">
                    {food.discountType !== "None" ? (
                      <span className="px-2 py-0.5 bg-red-50 text-red-600 rounded-[3px] text-xs  border border-red-100 uppercase">
                        {food.discount}
                        {food.discountType === "Percentage" ? "%" : "৳"} OFF
                      </span>
                    ) : (
                      <span className=" text-xs">N/A</span>
                    )}
                  </TableCell>
                  <TableCell className="text-slate-500 font-bold text-sm">
                    {food.price}৳
                  </TableCell>
                  <TableCell className="text-emerald-600 font-black text-base">
                    {food.discountPrice}৳
                  </TableCell>
                  <TableCell align="right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => {
                          setSelectedFoodId(food.id);
                          setIsModalOpen(true);
                        }}
                        className="p-1.5  hover:bg-blue-100 hover:text-blue-500 rounded-[5px] border-[1px]"
                      >
                        <Edit3 size={16} />
                      </button>
                      <button
                        onClick={() => {
                          setFoodToDelete(food);
                          setIsDeleteModalOpen(true);
                        }}
                        className="p-1.5 text-red-600 border-[1px] hover:bg-red-100 rounded-[5px]"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
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
          sx={{ borderTop: "1px solid #e2e8f0" }}
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
          <div className="flex flex-col items-center py-20 gap-2">
            <CircularProgress size={24} sx={{ color: "#ea580c" }} />
            <p className="text-[10px] font-black text-slate-400 uppercase">
              Loading Item...
            </p>
          </div>
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
