import {
  AppBar,
  Toolbar,
  IconButton,
  Stack,
  TextField,
  InputAdornment,
  Badge,
  Avatar,
  Typography,
  Box,
  useTheme,
} from "@mui/material";
import {
  Menu,
  X,
  Bell,
  Search,
  Globe,
  LayoutGrid,
  Settings,
  MessageSquare,
} from "lucide-react";

export default function Header({ toggleSidebar, isSidebarOpen, user }) {
  const theme = useTheme();

  return (
    <AppBar
      position="sticky"
      sx={{
        bgcolor: "background.paper",
        color: "text.primary",
        borderBottom: `1px solid ${theme.palette.divider}`,
        boxShadow: "none",
        zIndex: theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", px: { xs: 2, md: 3 } }}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <IconButton
            onClick={toggleSidebar}
            sx={{
              bgcolor: "secondary.lighter",
              borderRadius: 1,
              color: "text.primary",
            }}
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </IconButton>
        </Stack>

        <Stack direction="row" alignItems="center" spacing={1}>
          <Stack
            direction="row"
            spacing={1.5}
            alignItems="center"
            sx={{ pl: 2 }}
          >
            <Box
              sx={{ textAlign: "right", display: { xs: "none", sm: "block" } }}
            >
              <Typography variant="body2" sx={{ fontWeight: 700 }}>
                {user?.fullName || "Admin User"}
              </Typography>
              <Typography
                variant="caption"
                color="primary"
                sx={{ fontWeight: 700, textTransform: "uppercase" }}
              >
                {user?.role || "Admin"}
              </Typography>
            </Box>
            <Avatar
              sx={{
                width: 40,
                height: 40,
                bgcolor: "primary.main",
                fontWeight: 700,
                fontSize: "0.9rem",
                borderRadius: "5px", // Slightly rounded as per your preference
              }}
            >
              {user?.userName?.[0].toUpperCase() || "A"}
            </Avatar>
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
