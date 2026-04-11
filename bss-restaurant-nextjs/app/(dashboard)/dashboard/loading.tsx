import {
  Box,
  Stack,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const StatCardSkeleton = () => (
  <div className="p-6 bg-white rounded-md shadow-sm border border-slate-50 flex flex-col items-start animate-pulse">
    {/* Icon Square */}
    <div className="w-12 h-12 rounded-md bg-slate-200 mb-4 shadow-sm" />
    {/* Label */}
    <div className="h-4 w-24 bg-slate-100 rounded-md mb-2" />
    {/* Value */}
    <div className="h-8 w-32 bg-slate-200 rounded-lg" />
  </div>
);

const OrderRowSkeleton = () => (
  <TableRow sx={{ py: 0 }}>
    <TableCell sx={{ py: 1.5 }}>
      <Skeleton variant="text" width={60} height={25} />
    </TableCell>
    <TableCell sx={{ py: 1.5 }}>
      <Skeleton variant="text" width={50} height={25} />
    </TableCell>
    <TableCell sx={{ py: 1.5 }}>
      <Skeleton variant="text" width={70} height={25} />
    </TableCell>
    <TableCell sx={{ py: 1.5 }}>
      <Skeleton
        variant="rounded"
        width={60}
        height={24}
        sx={{ borderRadius: "5px" }}
      />
    </TableCell>
    <TableCell sx={{ py: 1.5 }}>
      <Skeleton variant="text" width={80} height={25} />
    </TableCell>
  </TableRow>
);

const TopSellerSkeleton = () => (
  <TableRow>
    <TableCell sx={{ width: 40 }}>
      <Skeleton variant="text" width={20} />
    </TableCell>
    <TableCell sx={{ width: 60 }}>
      <Skeleton
        variant="rounded"
        width={45}
        height={45}
        sx={{ borderRadius: "5px" }}
      />
    </TableCell>
    <TableCell>
      <Skeleton variant="text" width="80%" height={20} />
      <Skeleton variant="text" width="40%" height={15} />
    </TableCell>
    <TableCell align="right">
      <Skeleton variant="text" width={50} height={20} sx={{ ml: "auto" }} />
      <Skeleton variant="text" width={70} height={15} sx={{ ml: "auto" }} />
    </TableCell>
  </TableRow>
);

export default function Loading() {
  return (
    <Box className="space-y-10 animate-pulse">
      {/* 4 Stat Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <StatCardSkeleton key={i} />
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Recent Orders Table Skeleton (xl:col-span-2) */}
        <Box className="xl:col-span-2 overflow-hidden shadow-md bg-white rounded-md">
          <Box className="p-6 border-b-[1px] border-slate-200 flex items-center justify-between">
            <div className="h-6 w-32 bg-slate-200 rounded-md" />
            <div className="h-6 w-24 bg-slate-100 rounded-xs" />
          </Box>
          <TableContainer>
            <Table sx={{ minWidth: 600 }}>
              <TableHead className="bg-slate-50">
                <TableRow>
                  {[...Array(5)].map((_, i) => (
                    <TableCell key={i} sx={{ py: 1.5 }}>
                      <Skeleton variant="text" width={50} />
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {[...Array(5)].map((_, i) => (
                  <OrderRowSkeleton key={i} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        {/* Top Selling Foods Skeleton (xl:col-span-1) */}
        <Box className="bg-white rounded-md shadow-md">
          <Box className="flex items-center justify-between bg-slate-50 p-6 border-b-[1px] border-b-slate-200">
            <Stack direction="row" spacing={2} alignItems="center">
              <div className="w-5 h-5 bg-slate-200 rounded-full" />
              <div className="h-6 w-24 bg-slate-200 rounded-md" />
            </Stack>
            <div className="w-5 h-5 bg-slate-100 rounded-full" />
          </Box>
          <TableContainer>
            <Table size="small">
              <TableBody>
                {[...Array(5)].map((_, i) => (
                  <TopSellerSkeleton key={i} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </div>
    </Box>
  );
}
