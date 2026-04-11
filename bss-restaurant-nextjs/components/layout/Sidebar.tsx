"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation"; // Next.js version of location
import { useAuthContext } from "@/context/AuthContext";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  Toolbar,
  useMediaQuery,
  useTheme,
  Button,
  Tooltip,
} from "@mui/material";
import {
  LayoutDashboard,
  Users,
  UtensilsCrossed,
  ClipboardList,
  PlusCircle,
  LogOut,
  ChefHat,
  Table,
} from "lucide-react";
import { NavItem, SidebarProps } from "@/types";
import { logOut } from "@/actions/auth-actions";
import toast from "react-hot-toast";

const navItems: NavItem[] = [
  { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { name: "Employees", path: "/employees", icon: Users },
  { name: "Tables", path: "/tables", icon: Table },
  { name: "Orders", path: "/orders", icon: ClipboardList },
  { name: "New Order", path: "/new-order", icon: PlusCircle },
  { name: "Foods", path: "/foods", icon: UtensilsCrossed },
];

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    const res = await logOut();
    if (!res.success) toast.error("Logout Failed!");

    toast.success("Logout Successful!");
    router.push("/");
  };

  const drawerWidth = isOpen ? 280 : 80;

  const drawerContent = (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <Toolbar sx={{ px: isOpen ? 4 : 0, justifyContent: "left", mb: 2 }}>
        <Box
          sx={{
            p: 1,
            bgcolor: "primary.main",
            color: "white",
            borderRadius: `${theme.shape.borderRadius}px`,
            display: "flex",
            boxShadow: "0 4px 10px rgba(22, 119, 255, 0.2)",
          }}
        >
          <ChefHat size={20} />
        </Box>
        {isOpen && (
          <Typography
            variant="h6"
            sx={{ fontWeight: 600, letterSpacing: -0.5, ml: 2 }}
          >
            BSS Resto
          </Typography>
        )}
      </Toolbar>

      <Box sx={{ flex: 1, overflowX: "hidden" }}>
        <List sx={{ pt: 0 }}>
          {navItems.map((item) => {
            // Check if the current path matches the item path
            const isActive =
              pathname === item.path || pathname.startsWith(`${item.path}/`);
            const Icon = item.icon;

            return (
              <Tooltip
                title={!isOpen ? item.name : ""}
                placement="right"
                key={item.name}
              >
                {/* 3. Use Next.js Link as the component */}
                <ListItemButton
                  component={Link}
                  href={item.path} // 'to' becomes 'href' in Next.js
                  onClick={isMobile ? onClose : undefined}
                  selected={isActive}
                  sx={{
                    mb: 0.8,
                    py: 1.5,
                    px: isOpen ? 4 : 0,
                    justifyContent: isOpen ? "initial" : "center",
                    "&.Mui-selected": {
                      borderRight: isOpen ? "2px solid" : "none",
                      bgcolor: "primary.lighter",
                      color: "primary.main",
                      "& .MuiListItemIcon-root": { color: "primary.main" },
                    },
                    "&:hover": { bgcolor: "primary.lighter" },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: isOpen ? 38 : 0,
                      mr: isOpen ? 0 : "auto",
                      ml: isOpen ? 0 : "auto",
                    }}
                  >
                    <Icon size={20} />
                  </ListItemIcon>
                  {isOpen && (
                    <ListItemText
                      primary={item.name}
                      primaryTypographyProps={{
                        variant: "body2",
                        fontWeight: 400,
                      }}
                    />
                  )}
                </ListItemButton>
              </Tooltip>
            );
          })}
        </List>
      </Box>

      <Box
        sx={{
          p: isOpen ? 3 : 1,
          borderTop: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Button
          fullWidth
          variant="contained"
          onClick={handleLogout}
          sx={{
            bgcolor: "primary.main",
            minWidth: 0,
            py: 1.5,
            borderRadius: `${theme.shape.borderRadius}px`,
            "&:hover": { bgcolor: "primary.dark" },
          }}
        >
          {isOpen ? (
            <>
              <LogOut size={18} style={{ marginRight: 8 }} /> Sign Out
            </>
          ) : (
            <LogOut size={18} />
          )}
        </Button>
      </Box>
    </Box>
  );

  return (
    <Drawer
      variant={isMobile ? "temporary" : "permanent"}
      open={isOpen}
      onClose={onClose}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        zIndex: isMobile ? theme.zIndex.drawer + 2 : theme.zIndex.drawer,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          borderRight: `1px solid ${theme.palette.divider}`,
          transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        },
      }}
    >
      {drawerContent}
    </Drawer>
  );
}
