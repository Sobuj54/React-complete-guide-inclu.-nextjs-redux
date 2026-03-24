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
import { Edit2, Trash2, Star, User } from "lucide-react";

const EmployeeTable = ({
  employees,
  handleOpenEdit,
  handleDelete,
  totalEntries,
  perPage,
  page,
  onPageChange,
  onPerPageChange,
  isLoading,
}) => {
  const skeletonRows = Array.from(new Array(perPage || 5));

  return (
    <Paper
      elevation={0}
      sx={{
        width: "100%",
        overflow: "hidden",
        borderRadius: "7px",
        border: "1px solid #e2e8f0",
      }}
    >
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 800 }} aria-label="employee table">
          <TableHead>
            <TableRow sx={{ bgcolor: "#f8fafc" }}>
              <TableCell sx={{ width: 80 }} />
              <TableCell>Name</TableCell>
              <TableCell align="center" sx={{ width: 50 }} />
              <TableCell>Email</TableCell>
              <TableCell>Designation</TableCell>
              <TableCell>Join Date</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell align="right" sx={{ pr: 4 }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {isLoading
              ? skeletonRows.map((_, index) => (
                  <TableRow key={`skeleton-${index}`}>
                    <TableCell>
                      <Skeleton
                        variant="rectangular"
                        width={48}
                        height={30}
                        sx={{ borderRadius: "1px" }}
                      />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="text" width="120px" height={20} />
                    </TableCell>
                    <TableCell align="center">
                      <Skeleton
                        variant="circular"
                        width={16}
                        height={16}
                        sx={{ margin: "auto" }}
                      />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="text" width="150px" height={20} />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="rectangular" width={80} height={24} />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="text" width={100} height={20} />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="text" width={120} height={20} />
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
                          sx={{ borderRadius: "1px" }}
                        />
                        <Skeleton
                          variant="rectangular"
                          width={32}
                          height={32}
                          sx={{ borderRadius: "1px" }}
                        />
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              : employees.map((emp) => (
                  <TableRow key={emp.id} hover sx={{ py: 0 }}>
                    <TableCell sx={{ py: 0 }}>
                      <Avatar
                        src={
                          emp.user?.image
                            ? `https://restaurantapi.bssoln.com/images/user/${emp.user.image}`
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
                      <Typography variant="body2">
                        {emp.user?.fullName}
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Star
                        size={16}
                        className="text-orange-400 fill-orange-400"
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{emp.user?.email}</Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={emp.designation}
                        size="small"
                        sx={{
                          bgcolor: "oklch(93.5% 0.084 155.995)",
                          color: "oklch(44.8% 0.119 151.328)",
                          borderRadius: "3px",
                          fontSize: "13px",
                          fontWeight: 500,
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ whiteSpace: "nowrap" }}>
                        {new Date(emp.joinDate).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ whiteSpace: "nowrap" }}>
                        {emp.user?.phoneNumber}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "flex-end",
                          gap: 1,
                        }}
                      >
                        <IconButton
                          size="medium"
                          onClick={() => handleOpenEdit(emp.id)}
                          sx={{
                            borderRadius: "5px",
                            border: "1px solid #e2e8f0",
                            "&:hover": {
                              bgcolor: "oklch(70.7% 0.165 254.624)",
                              color: "white",
                            },
                          }}
                        >
                          <Edit2 size={14} />
                        </IconButton>
                        <IconButton
                          size="medium"
                          onClick={() => handleDelete(emp)}
                          sx={{
                            borderRadius: "5px",
                            border: "1px solid #e2e8f0",
                            "&:hover": { bgcolor: "#ef4444", color: "white" },
                          }}
                        >
                          <Trash2 size={14} />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={totalEntries || 0}
        page={page - 1}
        onPageChange={(e, newPage) => onPageChange(newPage + 1)}
        rowsPerPage={perPage}
        onRowsPerPageChange={(e) =>
          onPerPageChange(parseInt(e.target.value, 10))
        }
        rowsPerPageOptions={[5, 10, 20, 50]}
        sx={{
          borderTop: "1px solid #e2e8f0",
          ".MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows":
            {
              textTransform: "capitalize",
              fontSize: "14px",
            },
        }}
      />
    </Paper>
  );
};

export default EmployeeTable;
