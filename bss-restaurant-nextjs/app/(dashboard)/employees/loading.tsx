import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Skeleton,
} from "@mui/material";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

export default function Loading() {
  // we use 10 rows as a standard placeholder for loading
  const skeletonrows = Array.from(new Array(10));

  return (
    <Box sx={{ width: "100%" }}>
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
          <Table sx={{ minWidth: 750 }} size="small">
            <TableHead>
              <TableRow sx={{ bgcolor: "#f8fafc" }}>
                <TableCell sx={{ width: 60, py: 1 }} />
                <TableCell sx={{ py: 1, fontWeight: 600 }}>Name</TableCell>
                <TableCell
                  align="center"
                  sx={{
                    width: 50,
                    py: 1,
                    display: { xs: "none", md: "table-cell" },
                  }}
                />
                <TableCell sx={{ py: 1 }}>Email</TableCell>
                <TableCell sx={{ py: 1 }}>Designation</TableCell>
                <TableCell sx={{ py: 1 }}>Join Date</TableCell>
                <TableCell sx={{ py: 1 }}>Phone</TableCell>
                <TableCell align="right" sx={{ pr: 4, py: 1 }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {skeletonrows.map((_, index) => (
                <TableRow key={`loading-row-${index}`}>
                  <TableCell sx={{ py: 0.5 }}>
                    <Skeleton
                      variant="rectangular"
                      width={35}
                      height={35}
                      sx={{ borderRadius: "4px" }}
                    />
                  </TableCell>
                  <TableCell sx={{ py: 0.5 }}>
                    <Skeleton variant="text" width="100px" />
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ py: 0.5, display: { xs: "none", md: "table-cell" } }}
                  >
                    <Star
                      size={14}
                      color="#cbd5e1"
                      fill="#cbd5e1"
                      className="animate-pulse"
                    />
                  </TableCell>
                  <TableCell sx={{ py: 0.5 }}>
                    <Skeleton variant="text" width="140px" />
                  </TableCell>
                  <TableCell sx={{ py: 0.5 }}>
                    <Skeleton
                      variant="rectangular"
                      width={70}
                      height={20}
                      sx={{ borderRadius: "12px" }}
                    />
                  </TableCell>
                  <TableCell sx={{ py: 0.5 }}>
                    <Skeleton variant="text" width={80} />
                  </TableCell>
                  <TableCell sx={{ py: 0.5 }}>
                    <Skeleton variant="text" width={100} />
                  </TableCell>
                  <TableCell align="right" sx={{ py: 0.5, pr: 2 }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        gap: 1,
                      }}
                    >
                      <Skeleton variant="rectangular" width={28} height={28} />
                      <Skeleton variant="rectangular" width={28} height={28} />
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box
          sx={{
            p: 1.5,
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Skeleton variant="text" width={80} />
          <Skeleton variant="rectangular" width={30} height={18} />
          <Box sx={{ display: "flex", gap: 1 }}>
            <ChevronLeft size={18} color="#cbd5e1" />
            <ChevronRight size={18} color="#cbd5e1" />
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
