"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  Typography,
  Box,
  Avatar,
  AvatarGroup,
  IconButton,
  Chip,
  Tooltip,
  Stack,
  InputAdornment,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Plus, Search, Edit2, Trash2, UserPlus } from "lucide-react";

import { toBase64 } from "@/utils/to-base65";
import MainButton from "@/components/ui/button/MainButton";
import ResponsiveTooltip from "@/components/ui/ResponsiveTooltip";
import ActionButton from "@/components/ui/button/ActionButton";
import DeleteConfirmationModal from "@/components/ui/modal/DeleteConfirmationModal";
import TableFormModal from "./TablesFormModal";
import AssignStaffModal from "./AssignStaffModal";
import { useTables } from "@/hooks/useTables";
import TablesSkeleton from "@/app/(dashboard)/tables/loading";
import { PaginatedTableResponse } from "@/types/tables";
import { paginatedEmployeesResponse } from "@/types/employees";
import { TableForm } from "@/lib/validation/tables-schema";
import toast from "react-hot-toast";

interface Props {
  initialTables: PaginatedTableResponse;
  initialEmployees: paginatedEmployeesResponse;
}

export default function TablesClient({
  initialTables,
  initialEmployees,
}: Props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // --- Local State ---
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [tableToDelete, setTableToDelete] = useState<any>(null);
  const [assigningTableId, setAssigningTableId] = useState<string | null>(null);
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);

  // Search Debounce logic
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setPage(0);
    }, 400);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  // --- Custom Hook Usage ---
  const {
    tables,
    isLoading,
    isFetching,
    isError,
    tableDetails,
    unassignedStaff,
    isLoadingStaff,
    createTable,
    updateTable,
    deleteTable,
    assignStaff,
    isPending,
  } = useTables({
    page,
    perPage,
    debouncedSearch,
    initialTables,
    selectedId,
    assigningTableId,
  });

  // Employee Image Map logic
  const employeeImageMap = useMemo(() => {
    const map: Record<string, string> = {};
    initialEmployees?.data?.forEach((emp: any) => {
      if (emp.id && emp.user?.image) {
        map[emp.id] = emp.user.image;
      }
    });
    return map;
  }, [initialEmployees]);

  // --- Handlers ---
  const handleEdit = (table: any) => {
    setSelectedId(table.id);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (table: any) => {
    setTableToDelete(table);
    setIsDeleteModalOpen(true);
  };

  const handleOpenAssign = (id: string) => {
    setAssigningTableId(id);
    setSelectedEmployees([]);
    setIsAssignModalOpen(true);
  };

  const toggleEmployeeSelection = (empId: string) => {
    setSelectedEmployees((prev) =>
      prev.includes(empId)
        ? prev.filter((id) => id !== empId)
        : [...prev, empId],
    );
  };

  const handleConfirmAssignment = async () => {
    const payload = selectedEmployees.map((empId) => ({
      employeeId: empId,
      tableId: assigningTableId,
    }));
    assignStaff(payload, { onSuccess: () => setIsAssignModalOpen(false) });
  };

  const onConfirmDelete = async () => {
    if (tableToDelete) {
      deleteTable(tableToDelete.id, {
        onSuccess: () => {
          setIsDeleteModalOpen(false);
          setPage(0);
        },
      });
    }
  };

  const onFormSubmit = async (data: any) => {
    const hasFile = data.image && data.image[0] instanceof File;

    const payload = {
      tableNumber: data.tableNumber,
      numberOfSeats: Number(data.numberOfSeats),
      image: hasFile
        ? data?.image[0]?.name
        : selectedId
          ? tableDetails?.image
          : "",
      base64: hasFile ? await toBase64(data?.image[0]) : "",
    };

    if (selectedId) {
      await updateTable.mutateAsync({ id: selectedId, payload });
    } else {
      await createTable.mutateAsync(payload);
    }

    // Only runs if mutation is successful
    setIsModalOpen(false);
    setSelectedId(null);
  };

  const headerCellStyle = { py: 1.5, whiteSpace: "nowrap" };
  const bodyCellStyle = { py: 0.5, whiteSpace: "nowrap" };

  if (isError) return <p>Error loading tables...</p>;

  return (
    <Container maxWidth={false} disableGutters sx={{ px: 0, width: "100%" }}>
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
            placeholder="Search tables..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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
            label="Add Table"
            startIcon={<Plus size={18} />}
            onClick={() => {
              setSelectedId(null);
              setIsModalOpen(true);
            }}
            color="primary"
          />
        </Stack>
      </Box>

      {isLoading || isFetching ? (
        <TablesSkeleton rowCount={perPage} />
      ) : (
        <Paper
          elevation={0}
          sx={{
            borderRadius: "5px",
            border: "1px solid #f0f0f0",
            width: "100%",
            overflow: "hidden",
          }}
        >
          <TableContainer sx={{ width: "100%", overflowX: "auto" }}>
            <Table sx={{ minWidth: 700 }} size="small">
              <TableHead sx={{ bgcolor: "#f8fafc" }}>
                <TableRow>
                  <TableCell sx={headerCellStyle}>Preview</TableCell>
                  <TableCell sx={headerCellStyle}>Table No.</TableCell>
                  <TableCell sx={headerCellStyle} align="center">
                    Seats
                  </TableCell>
                  <TableCell sx={headerCellStyle}>Status</TableCell>
                  <TableCell sx={headerCellStyle}>Assigned Staff</TableCell>
                  <TableCell sx={headerCellStyle} align="right">
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tables?.data?.map((table: any) => (
                  <TableRow key={table.id} hover>
                    <TableCell sx={bodyCellStyle}>
                      <Avatar
                        variant="rounded"
                        src={`${process.env.NEXT_PUBLIC_IMG_URL}/images/table/${table.image}`}
                        sx={{ width: 40, height: 40, borderRadius: "5px" }}
                      />
                    </TableCell>
                    <TableCell sx={bodyCellStyle}>
                      <ResponsiveTooltip
                        title={table.tableNumber}
                        id={`${table.id}-num`}
                      >
                        <Typography
                          variant="body2"
                          className="max-w-[50px] lg:max-w-full truncate cursor-pointer md:cursor-default"
                        >
                          {table.tableNumber}
                        </Typography>
                      </ResponsiveTooltip>
                    </TableCell>
                    <TableCell sx={bodyCellStyle} align="center">
                      <Typography variant="body2">
                        {table.numberOfSeats}
                      </Typography>
                    </TableCell>
                    <TableCell sx={bodyCellStyle}>
                      <ResponsiveTooltip
                        title={table.isOccupied ? "Occupied" : "Available"}
                        id={`${table.id}-status`}
                      >
                        <Chip
                          label={table.isOccupied ? "Occupied" : "Available"}
                          size="small"
                          sx={{
                            fontWeight: 700,
                            borderRadius: "4px",
                            bgcolor: table.isOccupied ? "#fff1f0" : "#f6ffed",
                            color: table.isOccupied
                              ? "#ff4d4f"
                              : "success.dark",
                            maxWidth: { xs: 60, md: "100%" },
                            cursor: "pointer",
                          }}
                          className="truncate"
                        />
                      </ResponsiveTooltip>
                    </TableCell>
                    <TableCell sx={bodyCellStyle}>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <AvatarGroup
                          max={isMobile ? 3 : 4}
                          sx={{
                            "& .MuiAvatar-root": {
                              width: 32,
                              height: 32,
                              fontSize: "0.75rem",
                              border: "2px solid #fff",
                            },
                          }}
                        >
                          {table.employees?.map((emp: any) => (
                            <Tooltip
                              key={emp.employeeId}
                              title={emp.name}
                              arrow
                            >
                              <Avatar
                                src={`${process.env.NEXT_PUBLIC_IMG_URL}/images/user/${employeeImageMap[emp.employeeId]}`}
                              />
                            </Tooltip>
                          ))}
                        </AvatarGroup>
                        <IconButton
                          size="small"
                          onClick={() => handleOpenAssign(table.id)}
                          sx={{
                            color: "#1677ff",
                            border: "1px dotted #1677ff",
                          }}
                        >
                          <UserPlus size={18} />
                        </IconButton>
                      </Box>
                    </TableCell>
                    <TableCell sx={bodyCellStyle} align="right">
                      <Stack
                        direction="row"
                        spacing={1}
                        justifyContent="flex-end"
                      >
                        <ActionButton
                          icon={Edit2}
                          onClick={() => handleEdit(table)}
                          title="Edit"
                          colorType="primary"
                        />
                        <ActionButton
                          icon={Trash2}
                          onClick={() => handleDeleteClick(table)}
                          title="Delete"
                          colorType="error"
                        />
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box sx={{ width: "100%" }}>
            <TablePagination
              component="div"
              count={tables?.total || 0}
              page={page}
              onPageChange={(_, p) => setPage(p)}
              rowsPerPage={perPage}
              onRowsPerPageChange={(e) => {
                setPerPage(parseInt(e.target.value, 10));
                setPage(0);
              }}
              rowsPerPageOptions={[5, 10, 25]}
              labelRowsPerPage="Rows per page:"
            />
          </Box>
        </Paper>
      )}

      {/* Modals */}
      <TableFormModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedId(null);
        }}
        defaultValues={tableDetails}
        onSubmit={onFormSubmit}
        isLoading={isPending}
      />
      <AssignStaffModal
        isOpen={isAssignModalOpen}
        onClose={() => setIsAssignModalOpen(false)}
        isLoading={isLoadingStaff}
        staff={unassignedStaff}
        selectedEmployees={selectedEmployees}
        onToggle={toggleEmployeeSelection}
        onConfirm={handleConfirmAssignment}
        isSubmitting={isPending}
        imageMap={employeeImageMap}
      />
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        isLoading={isPending}
        onConfirm={onConfirmDelete}
        itemName={tableToDelete?.tableNumber || "this table"}
      />
    </Container>
  );
}
