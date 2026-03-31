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
  Tooltip,
  ClickAwayListener,
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
import ResponsiveTooltip from "../ResponsiveTooltip";

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
      <TableContainer sx={{ overflowX: "auto" }}>
        <Table sx={{ minWidth: 750 }} aria-label="employee table">
          <TableHead>
            <TableRow sx={{ bgcolor: "#f8fafc", py: 0 }}>
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
            {isLoading
              ? skeletonRows.map((_, index) => (
                  <TableRow key={`skeleton-${index}`}>
                    <TableCell sx={{ py: 0.5 }}>
                      <Skeleton variant="rectangular" width={48} height={30} />
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
                  const formattedDate = new Date(
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
                              onClick={() => toggleFavorite(emp.id)}
                              size="small"
                              sx={{ p: 0 }}
                            >
                              <Star
                                size={14}
                                className={`${isFav ? "text-yellow-500 fill-yellow-500" : "text-yellow-600"}`}
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
                          title={formattedDate}
                          id={`${emp.id}-date`}
                        >
                          <Typography
                            variant="body2"
                            sx={{ whiteSpace: "nowrap" }}
                            className="max-w-[60px] lg:max-w-full truncate cursor-pointer md:cursor-default"
                          >
                            {formattedDate}
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
        </Table>
      </TableContainer>

      <Box sx={{ borderTop: "1px solid #e2e8f0", width: "100%" }}>
        <TablePagination
          component="div"
          rowsPerPageOptions={[5, 10, 20, 50]}
          count={totalEntries || 0}
          rowsPerPage={perPage}
          page={page - 1}
          onPageChange={(e, newPage) => onPageChange(newPage + 1)}
          onRowsPerPageChange={(e) =>
            onPerPageChange(parseInt(e.target.value, 10))
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
  );
};

export default EmployeeTable;
