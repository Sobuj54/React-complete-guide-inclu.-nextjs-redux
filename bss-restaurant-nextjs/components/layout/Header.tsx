"use client";
import { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Stack,
  Avatar,
  Typography,
  Box,
  useTheme,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
} from "@mui/material";
import { Menu as MenuIcon, LogOut, Mail } from "lucide-react";
import { HeaderProps } from "@/types";
import { logOut } from "@/actions/auth-actions";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Header({ toggleSidebar }: HeaderProps) {
  const theme = useTheme();
  const router = useRouter();

  const user = {
    fullName: "test",
    userName: "test",
    email: "ex@mail",
    id: "22",
  };

  // --- MENU STATE LOGIC ---
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    const res = await logOut();
    if (!res.success) toast.error("Logout Failed!");

    toast.success("Logout Successful!");
    router.push("/");
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        bgcolor: "background.paper",
        color: "text.primary",
        borderBottom: `1px solid ${theme.palette.divider}`,
        boxShadow: "none",
        zIndex: 1,
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", px: { xs: 2, md: 3 } }}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <IconButton
            onClick={toggleSidebar}
            sx={{
              borderRadius: 1,
              color: "text.primary",
            }}
          >
            <MenuIcon size={20} />
          </IconButton>
        </Stack>

        <Stack direction="row" alignItems="center" spacing={1}>
          <Stack
            direction="row"
            spacing={1.5}
            alignItems="center"
            onClick={handleClick} // Open menu on click
            sx={{
              pl: 2,
              cursor: "pointer",
              p: 0.5,
              borderRadius: "5px",
              transition: "0.2s",
            }}
          >
            <Box
              sx={{
                textAlign: "right",
                display: { xs: "none", sm: "block" },
              }}
            >
              <Stack spacing={0.5}>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 700, lineHeight: 1.2 }}
                >
                  {user?.fullName || "Admin User"}
                </Typography>
                <Typography
                  variant="caption"
                  color="primary"
                  sx={{
                    fontWeight: 700,
                    textTransform: "uppercase",
                    fontSize: "10px",
                    lineHeight: 1,
                  }}
                >
                  {user?.userName || "Administrator"}
                </Typography>
              </Stack>
            </Box>
            <Avatar
              sx={{
                width: 38,
                height: 38,
                bgcolor: "primary.main",
                fontWeight: 800,
                fontSize: "0.85rem",
                borderRadius: "5px",
              }}
            >
              {user?.userName?.[0].toUpperCase() || "A"}
            </Avatar>
          </Stack>
        </Stack>

        {/* --- BEAUTIFUL PROFILE MENU --- */}
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          slotProps={{
            paper: {
              elevation: 0,
              sx: {
                width: 280,
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.1))",
                mt: 1.5,
                borderRadius: "5px",
                border: `1px solid ${theme.palette.divider}`,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
              },
            },
          }}
        >
          {/* Menu Header / Info Section */}
          <Box sx={{ px: 2.5, py: 2 }}>
            <Typography
              variant="subtitle2"
              sx={{ fontWeight: 800, color: "text.primary" }}
            >
              {user?.fullName || "Admin User"}
            </Typography>
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              sx={{ mt: 0.5 }}
            >
              <Mail size={14} color={theme.palette.text.secondary} />
              <Typography variant="caption" color="text.secondary">
                {user?.email || "admin@mail.com"}
              </Typography>
            </Stack>
            <Typography
              variant="caption"
              sx={{
                display: "block",
                mt: 1,
                color: "secondary.main",
                fontSize: "10px",
                fontFamily: "monospace",
              }}
            >
              ID: {user?.id || "N/A"}
            </Typography>
          </Box>

          <Divider sx={{ borderStyle: "dashed" }} />

          <Divider sx={{ borderStyle: "dashed" }} />

          <Box sx={{ p: 1 }}>
            <MenuItem
              onClick={handleLogout}
              sx={{
                borderRadius: "5px",
                py: 1,
                color: "error.main",
                "&:hover": { bgcolor: "error.lighter" },
              }}
            >
              <ListItemIcon>
                <LogOut size={18} color={theme.palette.error.main} />
              </ListItemIcon>
              <Typography variant="body2" sx={{ fontWeight: 700 }}>
                Logout
              </Typography>
            </MenuItem>
          </Box>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
