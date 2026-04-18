"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  IconButton,
  Typography,
  Chip,
  TablePagination,
  Box,
  Skeleton,
} from "@mui/material";
import {
  Edit2,
  Trash2,
  Star,
  User,
  ChevronLeft,
  ChevronRight,
  Plus,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { getEmployees } from "@/actions/employee-actions";
import { useemployeemutations } from "@/hooks/useEmployeeMutations";

// Components
import EmployeeForm from "./EmployeeForm";
import ResponsiveTooltip from "@/components/ui/ResponsiveTooltip";
import ActionButton from "@/components/ui/button/ActionButton";
import { EmployeesResponse, paginatedEmployeesResponse } from "@/types";
import DeleteConfirmationModal from "@/components/ui/modal/DeleteConfirmationModal";
import Modal from "@/components/ui/modal/Modal";
import MainButton from "@/components/ui/button/MainButton";
import { toBase64 } from "@/utils/to-base64";

interface tableshellprops {
  initialData: paginatedEmployeesResponse;
  page: number;
  perpage: number;
}

export default function TableShell({
  initialData,
  page,
  perpage,
}: tableshellprops) {
  const router = useRouter();
  const [favorites, setfavorites] = useState<string[]>([]);
  const [selectedemployee, setselectedemployee] = useState<any | null>(null);
  const [isformopen, setisformopen] = useState(false);

  // delete state
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState<any | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["employees", page, perpage],
    queryFn: () => getEmployees(page, perpage),
    initialData: initialData,
  });

  const { create, update, remove } = useemployeemutations(); // added create
  const createmutation = create(); // initialized create
  const updatemutation = update();

  const togglefavorite = (id: string) => {
    setfavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  // added handleaddclick
  const handleaddclick = () => {
    setselectedemployee(null);
    setisformopen(true);
  };

  const handleeditclick = (id: string) => {
    const emp = data?.data?.find((e: any) => e.id === id);

    if (emp) {
      const mappedEmployee = {
        ...emp,
        firstName: emp.user?.firstName || "",
        middleName: emp.user?.middleName || "",
        lastName: emp.user?.lastName || "",
        email: emp.user?.email || "",
        phone: emp.user?.phoneNumber || "",
        nid: emp.user?.nid || "",
        dob: emp.user?.dob ? emp.user.dob.split("T")[0] : "",
        joinDate: emp.joinDate ? emp.joinDate.split("T")[0] : "",
        gender: emp.user?.genderId === 1 ? "Male" : "Female",
        fatherName: emp.user?.fatherName || "",
        motherName: emp.user?.motherName || "",
        spouseName: emp.user?.spouseName || "",
        image: emp.user?.image || null,
      };

      setselectedemployee(mappedEmployee);
      setisformopen(true);
    }
  };

  // updated to use custom modal
  const handledeleteclick = (emp: any) => {
    setEmployeeToDelete(emp);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!employeeToDelete) return;
    await remove.mutateAsync(employeeToDelete.id);
    setIsDeleteModalOpen(false);
    setEmployeeToDelete(null);
  };

  const handleformsubmit = async (formData: any) => {
    try {
      const hasnewfile = formData.image && formData.image[0] instanceof File;

      let payload: any = {
        designation: formData.designation,
        joinDate: formData.joinDate
          ? new Date(formData.joinDate).toISOString()
          : null,
        email: formData.email,
        phoneNumber: formData.phone,
        firstName: formData.firstName,
        middleName: formData.middleName || "",
        lastName: formData.lastName,
        fatherName: formData.fatherName || "",
        motherName: formData.motherName || "",
        spouseName: formData.spouseName || "",
        dob: formData.dob ? new Date(formData.dob).toISOString() : null,
        nid: formData.nid,
        genderId: formData.gender === "Male" ? 1 : 2,
      };

      if (hasnewfile) {
        const file = formData.image[0];
        payload.image = file.name;
        payload.base64 = await toBase64(file);
      } else {
        payload.image = formData.image;
      }

      if (selectedemployee) {
        await updatemutation.mutateAsync({
          id: selectedemployee.id,
          formData: payload,
        });
      } else {
        await createmutation.mutateAsync(payload);
      }

      // clean up after success
      setisformopen(false);
      setselectedemployee(null);
    } catch (error) {
      console.error("form submission error:", error);
    }
  };

  const handlepagechange = (newpage: number) => {
    router.push(`/employees?page=${newpage}&perPage=${perpage}`);
  };

  const handlerowsperpagechange = (newperpage: number) => {
    router.push(`/employees?page=1&perPage=${newperpage}`);
  };

  const skeletonrows = Array.from(new Array(perpage || 5));

  return (
    <Box sx={{ width: "100%" }}>
      {/* inserted add button before the paper */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <MainButton
          label="Add Employee"
          startIcon={<Plus size={16} strokeWidth={3} />}
          onClick={handleaddclick}
        />
      </Box>

      <Paper
        elevation={0}
        sx={{
          width: "100%",
          overflow: "hidden",
          borderRadius: "5px",
          border: "1px solid #e2e8f0",
        }}
      >
        <TableContainer sx={{ overflowX: "auto" }}>
          <Table sx={{ minWidth: 750 }} aria-label="employee table">
            <TableHead>
              <TableRow sx={{ bgcolor: "#f8fafc" }}>
                <TableCell sx={{ width: 80, py: 0.5 }} />
                <TableCell sx={{ py: 0.5, minWidth: "80px" }}>Name</TableCell>
                <TableCell
                  align="center"
                  sx={{
                    width: 50,
                    py: 0.5,
                    display: { xs: "none", md: "table-cell" },
                  }}
                />
                <TableCell sx={{ py: 0.5 }}>Email</TableCell>
                <TableCell sx={{ py: 0.5 }}>Designation</TableCell>
                <TableCell sx={{ py: 0.5 }}>Join Date</TableCell>
                <TableCell sx={{ py: 1.5 }}>Phone</TableCell>
                <TableCell align="right" sx={{ pr: 4, py: 1.5 }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {isLoading && !data
                ? skeletonrows.map((_, index) => (
                    <TableRow key={`skeleton-${index}`}>
                      <TableCell sx={{ py: 0.5 }}>
                        <Skeleton
                          variant="rectangular"
                          width={48}
                          height={30}
                        />
                      </TableCell>
                      <TableCell>
                        <Skeleton variant="text" width="120px" />
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{ display: { xs: "none", md: "table-cell" } }}
                      >
                        <Star
                          size={16}
                          color="grey"
                          fill="grey"
                          className="animate-pulse"
                        />
                      </TableCell>
                      <TableCell>
                        <Skeleton variant="text" width="150px" />
                      </TableCell>
                      <TableCell>
                        <Skeleton
                          variant="rectangular"
                          width={80}
                          height={24}
                        />
                      </TableCell>
                      <TableCell>
                        <Skeleton variant="text" width={100} />
                      </TableCell>
                      <TableCell>
                        <Skeleton variant="text" width={120} />
                      </TableCell>
                      <TableCell align="right">
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            gap: 1,
                          }}
                        >
                          <Skeleton
                            variant="rectangular"
                            width={32}
                            height={32}
                          />
                          <Skeleton
                            variant="rectangular"
                            width={32}
                            height={32}
                          />
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))
                : data?.data?.map((emp: EmployeesResponse) => {
                    const isfav = favorites.includes(emp.id);
                    const formatteddate = new Date(
                      emp.joinDate,
                    ).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });

                    return (
                      <TableRow
                        key={emp.id}
                        hover
                        sx={{ "& .MuiTableCell-root": { py: 0.5 } }}
                      >
                        <TableCell>
                          <Avatar
                            src={
                              emp.user?.image
                                ? `${process.env.NEXT_PUBLIC_IMG_URL}/images/user/${emp.user.image}`
                                : ""
                            }
                            sx={{
                              width: 40,
                              height: 40,
                              borderRadius: "5px",
                              border: "1px solid #e2e8f0",
                            }}
                          >
                            <User size={20} />
                          </Avatar>
                        </TableCell>

                        <TableCell>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: "1px",
                            }}
                          >
                            <ResponsiveTooltip
                              title={emp.user?.fullName}
                              id={`${emp.id}-name`}
                            >
                              <Typography
                                variant="body2"
                                className="max-w-[60px] lg:max-w-full truncate cursor-pointer md:cursor-default"
                              >
                                {emp.user?.fullName}
                              </Typography>
                            </ResponsiveTooltip>
                            <Box sx={{ display: { xs: "block", md: "none" } }}>
                              <IconButton
                                onClick={() => togglefavorite(emp.id)}
                                size="small"
                                sx={{ p: 0 }}
                              >
                                <Star
                                  size={14}
                                  className={
                                    isfav
                                      ? "text-yellow-500 fill-yellow-500"
                                      : "text-yellow-600"
                                  }
                                />
                              </IconButton>
                            </Box>
                          </Box>
                        </TableCell>

                        <TableCell
                          align="left"
                          sx={{ display: { xs: "none", md: "table-cell" } }}
                        >
                          <IconButton
                            onClick={() => togglefavorite(emp.id)}
                            size="small"
                          >
                            <Star
                              size={16}
                              className={
                                isfav
                                  ? "text-yellow-500 fill-yellow-500"
                                  : "text-yellow-600"
                              }
                            />
                          </IconButton>
                        </TableCell>

                        <TableCell>
                          <ResponsiveTooltip
                            title={emp.user?.email}
                            id={`${emp.id}-email`}
                          >
                            <Typography
                              variant="body2"
                              className="max-w-[60px] lg:max-w-full truncate cursor-pointer md:cursor-default"
                            >
                              {emp.user?.email}
                            </Typography>
                          </ResponsiveTooltip>
                        </TableCell>

                        <TableCell>
                          <ResponsiveTooltip
                            title={emp.designation}
                            id={`${emp.id}-designation`}
                          >
                            <Chip
                              label={emp.designation}
                              size="small"
                              sx={{
                                bgcolor: "oklch(93.5% 0.084 155.995)",
                                color: "oklch(44.8% 0.119 151.328)",
                                borderRadius: "3px",
                                cursor: "pointer",
                              }}
                            />
                          </ResponsiveTooltip>
                        </TableCell>

                        <TableCell>
                          <ResponsiveTooltip
                            title={formatteddate}
                            id={`${emp.id}-date`}
                          >
                            <Typography
                              variant="body2"
                              sx={{ whiteSpace: "nowrap" }}
                              className="max-w-[60px] lg:max-w-full truncate cursor-pointer md:cursor-default"
                            >
                              {formatteddate}
                            </Typography>
                          </ResponsiveTooltip>
                        </TableCell>

                        <TableCell>
                          <ResponsiveTooltip
                            title={emp.user?.phoneNumber}
                            id={`${emp.id}-phone`}
                          >
                            <Typography
                              variant="body2"
                              className="max-w-[60px] lg:max-w-full truncate cursor-pointer md:cursor-default"
                            >
                              {emp.user?.phoneNumber}
                            </Typography>
                          </ResponsiveTooltip>
                        </TableCell>

                        <TableCell align="right">
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "flex-end",
                              gap: 1,
                            }}
                          >
                            <ActionButton
                              icon={Edit2}
                              title="Update"
                              colorType="primary"
                              onClick={() => handleeditclick(emp.id)}
                            />
                            <ActionButton
                              icon={Trash2}
                              title="Delete"
                              colorType="error"
                              onClick={() => handledeleteclick(emp)}
                            />
                          </Box>
                        </TableCell>
                      </TableRow>
                    );
                  })}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ width: "100%" }}>
          <TablePagination
            component="div"
            rowsPerPageOptions={[5, 10, 20, 50]}
            count={data?.total || 0}
            rowsPerPage={perpage}
            page={page - 1}
            onPageChange={(_, newpage) => handlepagechange(newpage + 1)}
            onRowsPerPageChange={(e) =>
              handlerowsperpagechange(parseInt(e.target.value, 10))
            }
            slotProps={{
              actions: {
                nextButton: { children: <ChevronRight size={20} /> },
                previousButton: { children: <ChevronLeft size={20} /> },
              },
            }}
          />
        </Box>
      </Paper>

      {/* Edit/Add Modal */}
      <Modal
        isOpen={isformopen}
        onClose={() => {
          setisformopen(false);
          setselectedemployee(null);
        }}
        title={
          selectedemployee ? "Edit Employee Information" : "Add New Employee"
        }
      >
        <EmployeeForm
          defaultValues={selectedemployee || {}}
          onSubmit={handleformsubmit}
          onCancel={() => setisformopen(false)}
          isLoading={updatemutation.isPending || createmutation.isPending}
        />
      </Modal>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        isLoading={remove.isPending}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        itemName={employeeToDelete?.user?.fullName || "this employee"}
      />
    </Box>
  );
}
