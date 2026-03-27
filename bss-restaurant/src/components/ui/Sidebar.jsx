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
import { Link, useLocation } from "react-router";
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
import { useAuthContext } from "../../context/AuthContext";

const navItems = [
  { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { name: "Employees", path: "employees", icon: Users },
  { name: "Tables", path: "tables", icon: Table },
  { name: "Orders", path: "orders", icon: ClipboardList },
  { name: "New Order", path: "new-order", icon: PlusCircle },
  { name: "Foods", path: "foods", icon: UtensilsCrossed },
];

export default function Sidebar({ isOpen, onClose }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const location = useLocation();
  const { logout } = useAuthContext();

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
            borderRadius: theme.shape.borderRadius,
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
            const isActive = location.pathname.endsWith(item.path);
            const Icon = item.icon;

            return (
              <Tooltip
                title={!isOpen ? item.name : ""}
                placement="right"
                key={item.name}
              >
                <ListItemButton
                  component={Link}
                  to={item.path}
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
          onClick={logout}
          sx={{
            bgcolor: "primary.main",
            minWidth: 0,
            py: 1.5,
            borderRadius: theme.shape.borderRadius,
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
        // Higher Z-index for mobile to cover the header
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
