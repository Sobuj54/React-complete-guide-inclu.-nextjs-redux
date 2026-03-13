import { useState, useEffect } from "react";
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
  Button,
  TextField,
  Typography,
  Box,
  Avatar,
  AvatarGroup,
  IconButton,
  Chip,
  Tooltip,
  CircularProgress,
  Stack,
  InputAdornment,
  Skeleton,
} from "@mui/material";

// Lucide Icons
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  CheckCircle2,
  XCircle,
  UserPlus,
} from "lucide-react";

// Hooks & Utils
import {
  useTables,
  useTable,
  useTableMutations,
  useUnassignedEmployees,
} from "../../hooks/useTables";
import { toBase64 } from "../../utils/to-base64";

// Components
import ErrorState from "../../components/ErrorState";
import AssignStaffModal from "../../components/ui/AssignStaffModal";
import DeleteTableModal from "../../components/ui/DeleteTableModal";
import TableFormModal from "../../components/ui/TableForm";

export default function Tables() {
  // State Management
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // UI Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);

  // Selection States
  const [selectedId, setSelectedId] = useState(null);
  const [tableToDelete, setTableToDelete] = useState(null);
  const [assigningTableId, setAssigningTableId] = useState(null);
  const [selectedEmployees, setSelectedEmployees] = useState([]);

  // Debounce Search Logic
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setPage(0);
    }, 400);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  // Data Fetching
  const {
    data: response,
    isLoading,
    isFetching,
    isError,
  } = useTables(page + 1, perPage, debouncedSearch);

  const { data: tableDetails } = useTable(selectedId);
  const { data: unassignedStaff, isLoading: isLoadingStaff } =
    useUnassignedEmployees(assigningTableId);
  const { createTable, updateTable, deleteTable, assignEmployees } =
    useTableMutations();

  // Pagination Handlers
  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Action Handlers
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

  const headerCellStyle = {
    py: 2,
    px: 3,
    whiteSpace: "nowrap",
  };

  const LoadingRows = () => (
    <>
      {[...Array(perPage)].map((_, index) => (
        <TableRow key={index}>
          <TableCell sx={{ px: 4 }}>
            <Skeleton
              variant="rounded"
              width={50}
              height={50}
              sx={{ borderRadius: 2 }}
            />
          </TableCell>
          <TableCell sx={{ px: 4 }}>
            <Skeleton variant="text" width="60%" sx={{ mb: 1 }} />
            <Skeleton variant="text" width="40%" />
          </TableCell>
          <TableCell align="center">
            <Skeleton
              variant="rectangular"
              width={40}
              height={28}
              sx={{ mx: "auto", borderRadius: 1 }}
            />
          </TableCell>
          <TableCell>
            <Skeleton
              variant="rounded"
              width={100}
              height={32}
              sx={{ borderRadius: 1 }}
            />
          </TableCell>
          <TableCell>
            <Skeleton width={120} height={36} />
          </TableCell>
          <TableCell align="right">
            <Skeleton
              variant="rectangular"
              width={80}
              height={36}
              sx={{ ml: "auto", borderRadius: 1.5 }}
            />
          </TableCell>
        </TableRow>
      ))}
    </>
  );

  if (isError) return <ErrorState />;

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 2, md: 1 } }}>
      {/* Search and Action Header */}
      <Box
        sx={{
          mb: 2,
          display: "flex",
          justifyContent: { xs: "center", md: "end" },
          alignItems: "center",
        }}
      >
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          sx={{ width: { xs: "100%", md: "auto" } }}
        >
          <TextField
            fullWidth
            size="small"
            placeholder="Search tables..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search size={18} color="#94a3b8" />
                </InputAdornment>
              ),
              sx: {
                borderRadius: 1,
                fontWeight: 600,
                bgcolor: "white",
                fontSize: "14px",
              },
            }}
          />
          <Button
            variant="contained"
            size="medium"
            disableElevation
            fullWidth={{ xs: true, sm: false }}
            startIcon={<Plus size={16} strokeWidth={3} />}
            onClick={() => {
              setSelectedId(null);
              setIsModalOpen(true);
            }}
            sx={{
              borderRadius: 1,
              px: 4,
              fontWeight: 700,
              whiteSpace: "nowrap",
              textTransform: "none",
              bgcolor: "primary.main",
              "&:hover": { bgcolor: "#ea580c" },
            }}
          >
            Add Table
          </Button>
        </Stack>
      </Box>

      {/* Main Table Content */}
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: "7px",
          // responsive overflow handling
          width: "100%",
          overflowX: "auto",
        }}
      >
        <Table sx={{ minWidth: 900 }} size="small">
          <TableHead sx={{ bgcolor: "background.default" }}>
            <TableRow>
              <TableCell sx={headerCellStyle}>Preview</TableCell>
              <TableCell sx={headerCellStyle}>Table Number</TableCell>
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
            {isLoading || isFetching ? (
              <LoadingRows />
            ) : (
              response?.data?.map((table) => (
                <TableRow
                  key={table.id}
                  hover
                  sx={{
                    "&:last-child td, &:last-child th": {
                      border: 0,
                    },
                  }}
                >
                  <TableCell sx={{ px: 4 }}>
                    <Avatar
                      variant="rounded"
                      src={`https://bssrms.runasp.net/images/table/${table.image}`}
                      sx={{
                        width: 50,
                        height: 50,
                        borderRadius: 2,
                        border: "2px solid #f1f5f9",
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ px: 4 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 500,
                        color: "#1e293b",
                        fontSize: "0.95rem",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {table.tableNumber}
                    </Typography>
                  </TableCell>
                  <TableCell align="center" sx={{ px: 4 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 900,
                        color: "#1e293b",
                        fontSize: "0.95rem",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {table.numberOfSeats}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      icon={
                        table.isOccupied ? (
                          <XCircle size={14} />
                        ) : (
                          <CheckCircle2 size={14} />
                        )
                      }
                      label={table.isOccupied ? "Occupied" : "Available"}
                      sx={{
                        fontWeight: 900,
                        borderRadius: 1.5,
                        bgcolor: table.isOccupied ? "#fef2f2" : "#f0fdf4",
                        color: table.isOccupied ? "#ef4444" : "#16a34a",
                        border: "1px solid",
                        borderColor: table.isOccupied ? "#fee2e2" : "#dcfce7",
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ px: 4 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <AvatarGroup
                        max={3}
                        sx={{
                          "& .MuiAvatar-root": {
                            width: 34,
                            height: 34,
                            border: "2px solid white",
                            fontSize: "0.8rem",
                            fontWeight: 900,
                          },
                        }}
                      >
                        {table.employees?.map((emp, idx) => (
                          <Tooltip key={idx} title={emp.name}>
                            <Avatar
                              src={`https://bssrms.runasp.net/images/employee/${emp.image}`}
                            />
                          </Tooltip>
                        ))}
                      </AvatarGroup>
                      <IconButton
                        onClick={() => handleOpenAssign(table.id)}
                        sx={{
                          border: "2px dashed oklch(79.2% 0.209 151.711)",
                          "&:hover": {
                            bgcolor: "oklch(79.2% 0.209 151.711)",
                            color: "white",
                          },
                        }}
                      >
                        <UserPlus size={18} />
                      </IconButton>
                    </Box>
                  </TableCell>
                  <TableCell align="right" sx={{ pl: 5 }}>
                    <Stack
                      direction="row"
                      spacing={1}
                      justifyContent="flex-end"
                    >
                      <IconButton
                        onClick={() => handleEdit(table)}
                        sx={{
                          color: "#64748b",
                          bgcolor: "#f8fafc",
                          borderRadius: 1.5,
                          "&:hover": { color: "#3b82f6", bgcolor: "#eff6ff" },
                        }}
                      >
                        <Edit2 size={18} />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDeleteClick(table)}
                        sx={{
                          color: "#64748b",
                          bgcolor: "#f8fafc",
                          borderRadius: 1.5,
                          "&:hover": { color: "#ef4444", bgcolor: "#fef2f2" },
                        }}
                      >
                        <Trash2 size={18} />
                      </IconButton>
                    </Stack>
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
          onPageChange={handleChangePage}
          rowsPerPage={perPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[10, 20, 30]}
          sx={{
            borderTop: "2px solid #f1f5f9",
            fontWeight: 900,
            "& .MuiTablePagination-toolbar": {
              flexWrap: "wrap",
              justifyContent: "end",
            },
          }}
        />
      </TableContainer>

      {/* Modals remain the same */}
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
      />
      <DeleteTableModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={onConfirmDelete}
        tableName={tableToDelete?.tableNumber}
        isDeleting={deleteTable.isPending}
      />
    </Container>
  );
}
