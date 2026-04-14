import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Skeleton,
  Stack,
} from "@mui/material";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface TablesSkeletonProps {
  rowCount?: number;
}

export default function TablesSkeleton({ rowCount = 10 }: TablesSkeletonProps) {
  const headerCellStyle = { py: 1.5, whiteSpace: "nowrap" };
  const bodyCellStyle = { py: 0.5, whiteSpace: "nowrap" };

  return (
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
            {[...Array(rowCount)].map((_, index) => (
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
                  <Box sx={{ display: "flex" }}>
                    <Skeleton variant="circular" width={28} height={28} />
                    <Skeleton variant="circular" width={28} height={28} />
                    <Skeleton variant="circular" width={28} height={28} />
                  </Box>
                </TableCell>
                <TableCell sx={bodyCellStyle} align="right">
                  <Stack direction="row" spacing={1} justifyContent="flex-end">
                    <Skeleton variant="rectangular" width={32} height={32} />
                    <Skeleton variant="rectangular" width={32} height={32} />
                  </Stack>
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
  );
}
