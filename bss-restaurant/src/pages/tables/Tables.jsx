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
  Skeleton,
  useMediaQuery,
  useTheme,
} from "@mui/material";

// Icons
import { Plus, Search, Edit2, Trash2, UserPlus } from "lucide-react";

// Hooks
import {
  useTables,
  useTable,
  useTableMutations,
  useUnassignedEmployees,
} from "../../hooks/useTables";
import { toBase64 } from "../../utils/to-base64";
import { useEmployees } from "../../hooks/useEmployees";

// Components
import ErrorState from "../../components/ErrorState";
import AssignStaffModal from "../../components/ui/AssignStaffModal";
import TableFormModal from "../../components/ui/TableForm";
import MainButton from "../../components/MainButton";
import ActionButton from "../../components/ActionButton";
import DeleteConfirmationModal from "../../components/ui/DeleteConfirmationModal";
import ResponsiveTooltip from "../../components/ResponsiveTooltip";

export default function Tables() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);

  const [selectedId, setSelectedId] = useState(null);
  const [tableToDelete, setTableToDelete] = useState(null);
  const [assigningTableId, setAssigningTableId] = useState(null);
  const [selectedEmployees, setSelectedEmployees] = useState([]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setPage(0);
    }, 400);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  const {
    data: response,
    isLoading,
    isFetching,
    isError,
  } = useTables(page + 1, perPage, debouncedSearch);
  const { data: employeesResponse } = useEmployees(1, 100);

  const employeeImageMap = useMemo(() => {
    const map = {};
    employeesResponse?.data?.forEach((emp) => {
      if (emp.id && emp.user?.image) {
        map[emp.id] = emp.user.image;
      }
    });
    return map;
  }, [employeesResponse]);

  const { data: tableDetails } = useTable(selectedId);
  const { data: unassignedStaff, isLoading: isLoadingStaff } =
    useUnassignedEmployees(assigningTableId);
  const { createTable, updateTable, deleteTable, assignEmployees } =
    useTableMutations();

  const handleEdit = (table) => {
    setSelectedId(table.id);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (table) => {
    setTableToDelete(table);
    setIsDeleteModalOpen(true);
  };

  const handleOpenAssign = (id) => {
    setAssigningTableId(id);
    setSelectedEmployees([]);
    setIsAssignModalOpen(true);
  };

  const toggleEmployeeSelection = (empId) => {
    if (!empId) return;
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
    await assignEmployees.mutateAsync(payload);
    setIsAssignModalOpen(false);
  };

  const onConfirmDelete = async () => {
    if (tableToDelete) {
      await deleteTable.mutateAsync(tableToDelete.id);
      setIsDeleteModalOpen(false);
    }
  };

  const onFormSubmit = async (data) => {
    const hasFile = data.image && data.image[0] instanceof File;
    const payload = {
      tableNumber: data.tableNumber,
      numberOfSeats: Number(data.numberOfSeats),
      image: hasFile ? data.image[0].name : tableDetails?.image || "",
      base64: hasFile ? await toBase64(data.image[0]) : "",
    };
    selectedId
      ? await updateTable.mutateAsync({ id: selectedId, payload })
      : await createTable.mutateAsync(payload);
    setIsModalOpen(false);
    setSelectedId(null);
  };

  const headerCellStyle = { py: 1.5, whiteSpace: "nowrap" };
  const bodyCellStyle = { py: 0.5, whiteSpace: "nowrap" };

  if (isError) return <ErrorState />;

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
              {isLoading || isFetching
                ? [...Array(perPage)].map((_, index) => (
                    <TableRow key={index}>
                      <TableCell sx={bodyCellStyle}>
                        <Skeleton variant="rounded" width={40} height={40} />
                      </TableCell>
                      <TableCell sx={bodyCellStyle}>
                        <Skeleton width="40%" />
                      </TableCell>
                      <TableCell sx={bodyCellStyle}>
                        <Skeleton width="20%" sx={{ mx: "auto" }} />
                      </TableCell>
                      <TableCell sx={bodyCellStyle}>
                        <Skeleton variant="rounded" width={70} height={24} />
                      </TableCell>
                      <TableCell sx={bodyCellStyle}>
                        <Box sx={{ display: "flex", gap: 0.5 }}>
                          <Skeleton variant="circular" width={28} height={28} />
                          <Skeleton variant="circular" width={28} height={28} />
                        </Box>
                      </TableCell>
                      <TableCell sx={bodyCellStyle} align="right">
                        <Stack
                          direction="row"
                          spacing={1}
                          justifyContent="flex-end"
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
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))
                : response?.data?.map((table) => (
                    <TableRow key={table.id} hover>
                      <TableCell sx={bodyCellStyle}>
                        <Avatar
                          variant="rounded"
                          src={`${import.meta.env.VITE_IMG_URL}/images/table/${table.image}`}
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
                            {table.employees?.map((emp) => (
                              <Tooltip
                                key={emp.employeeId}
                                title={emp.name}
                                arrow
                              >
                                <Avatar
                                  src={`${import.meta.env.VITE_IMG_URL}/images/user/${employeeImageMap[emp.employeeId]}`}
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

        <Box sx={{ borderTop: "1px solid #f0f0f0", width: "100%" }}>
          <TablePagination
            component="div"
            count={response?.total || 0}
            page={page}
            onPageChange={(e, p) => setPage(p)}
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

      {/* Modals */}
      <TableFormModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedId(null);
        }}
        defaultValues={tableDetails}
        onSubmit={onFormSubmit}
        isLoading={createTable.isPending || updateTable.isPending}
      />
      <AssignStaffModal
        isOpen={isAssignModalOpen}
        onClose={() => setIsAssignModalOpen(false)}
        isLoading={isLoadingStaff}
        staff={unassignedStaff}
        selectedEmployees={selectedEmployees}
        onToggle={toggleEmployeeSelection}
        onConfirm={handleConfirmAssignment}
        isSubmitting={assignEmployees.isPending}
        imageMap={employeeImageMap}
      />
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        isLoading={deleteTable.isPending}
        onConfirm={onConfirmDelete}
        itemName={tableToDelete?.tableNumber || "this table"}
      />
    </Container>
  );
}
