import { useState } from "react";
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
  TableFooter,
} from "@mui/material";
import {
  Edit2,
  Trash2,
  Star,
  User,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import ActionButton from "../ActionButton";

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
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const skeletonRows = Array.from(new Array(perPage || 5));

  return (
    <Paper
      elevation={0}
      sx={{
        width: "100%",
        overflow: "hidden",
        borderRadius: "5px",
        border: "1px solid #e2e8f0",
      }}
    >
      <TableContainer>
        <Table sx={{ minWidth: 1000 }} aria-label="employee table">
          <TableHead>
            <TableRow sx={{ bgcolor: "#f8fafc", py: 0 }}>
              <TableCell sx={{ width: 80, py: 0.5 }} />
              <TableCell sx={{ py: 0.5 }}>Name</TableCell>
              <TableCell align="center" sx={{ width: 50, py: 0.5 }} />
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
            {isLoading
              ? skeletonRows.map((_, index) => (
                  <TableRow key={`skeleton-${index}`}>
                    <TableCell sx={{ py: 0.5 }}>
                      <Skeleton variant="rectangular" width={48} height={30} />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="text" width="120px" />
                    </TableCell>
                    <TableCell align="center">
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
                      <Skeleton variant="rectangular" width={80} height={24} />
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
              : employees.map((emp) => {
                  const isFav = favorites.includes(emp.id);
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
                              ? `${import.meta.env.VITE_IMG_URL}/images/user/${emp.user.image}`
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
                        <IconButton
                          onClick={() => toggleFavorite(emp.id)}
                          size="small"
                        >
                          <Star
                            size={16}
                            className={`${isFav ? "text-yellow-500 fill-yellow-500" : "text-yellow-600"}`}
                          />
                        </IconButton>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {emp.user?.email}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={emp.designation}
                          size="small"
                          sx={{
                            bgcolor: "oklch(93.5% 0.084 155.995)",
                            color: "oklch(44.8% 0.119 151.328)",
                            borderRadius: "3px",
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="body2"
                          sx={{ whiteSpace: "nowrap" }}
                        >
                          {new Date(emp.joinDate).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
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
                          <ActionButton
                            icon={Edit2}
                            title="Update"
                            colorType="primary"
                            onClick={() => handleOpenEdit(emp.id)}
                          />
                          <ActionButton
                            icon={Trash2}
                            title="Delete"
                            colorType="error"
                            onClick={() => handleDelete(emp)}
                          />
                        </Box>
                      </TableCell>
                    </TableRow>
                  );
                })}
          </TableBody>

          <TableFooter sx={{ borderTop: "1px solid #e2e8f0" }}>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 20, 50]}
                colSpan={8}
                count={totalEntries || 0}
                rowsPerPage={perPage}
                page={page - 1}
                onPageChange={(e, newPage) => onPageChange(newPage + 1)}
                onRowsPerPageChange={(e) =>
                  onPerPageChange(parseInt(e.target.value, 10))
                }
                // Using slotProps to replace default MUI icons with Lucide
                slotProps={{
                  actions: {
                    nextButton: { children: <ChevronRight size={20} /> },
                    previousButton: { children: <ChevronLeft size={20} /> },
                  },
                }}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default EmployeeTable;
