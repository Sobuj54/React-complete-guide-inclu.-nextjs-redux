import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Checkbox,
  Typography,
  Box,
  CircularProgress,
  IconButton,
  Divider,
} from "@mui/material";
import { Check, X, Users, User } from "lucide-react";

export default function AssignStaffModal({
  isOpen,
  onClose,
  isLoading,
  staff = [],
  selectedEmployees,
  onToggle,
  onConfirm,
  isSubmitting,
}) {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          borderRadius: 2,
          padding: 1,
        },
      }}
      sx={{
        "& .MuiPaper-root": {
          backgroundColor: "grey.100", // Change to your desired color
        },
      }}
    >
      {/* Header */}
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pb: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
          }}
        >
          <Users size={24} className="text-orange-500" />
          <Typography variant="h6" sx={{ fontWeight: 900, color: "#1e293b" }}>
            Assign Staff
          </Typography>
        </Box>
        <IconButton onClick={onClose} size="small">
          <X size={20} />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ py: 2 }}>
        <Typography
          variant="body2"
          sx={{ mb: 2, fontWeight: 700, color: "text.secondary" }}
        >
          Select staff members to assign to this table:
        </Typography>

        {/* Staff List Area */}
        <Box sx={{ minHeight: 200, maxHeight: 400, overflowY: "auto" }}>
          {isLoading ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                py: 8,
                gap: 2,
              }}
            >
              <CircularProgress
                size={32}
                thickness={5}
                sx={{ color: "#f97316" }}
              />
              <Typography
                variant="caption"
                sx={{
                  fontWeight: 900,
                  letterSpacing: 1,
                  color: "text.disabled",
                }}
              >
                FETCHING STAFF...
              </Typography>
            </Box>
          ) : staff?.length > 0 ? (
            <List sx={{ width: "100%", bgcolor: "gery.200" }}>
              {staff.map((emp) => {
                const currentId = emp.employeeId || emp.id;
                const isSelected = selectedEmployees.includes(currentId);

                return (
                  <ListItem
                    key={currentId}
                    disablePadding
                    sx={{
                      mb: 2,
                      border: "1px solid",
                      borderColor: isSelected ? "orange.200" : "grey.100",
                      bgcolor: isSelected ? "orange.200" : "white",
                      borderRadius: 1,
                      transition: "all 0.2s",
                      "&:hover": {
                        bgcolor: isSelected ? "orange.100" : "grey.100",
                      },
                      boxShadow: 1,
                    }}
                  >
                    <Box
                      onClick={() => onToggle(currentId)}
                      sx={{
                        display: "flex",
                        width: "100%",
                        alignItems: "center",
                        p: 1.5,
                        cursor: "pointer",
                        gap: "5px",
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar
                          src={
                            emp.image
                              ? `https://bssrms.runasp.net/images/employee/${emp.image}`
                              : undefined
                          }
                          sx={{
                            bgcolor: isSelected ? "orange.500" : "grey.500",
                            fontWeight: 900,
                          }}
                        >
                          {!emp.image &&
                            (emp.name?.charAt(0) || <User size={18} />)}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Typography
                            variant="subtitle2"
                            sx={{ fontWeight: 900, color: "#0f172a" }}
                          >
                            {emp.name}
                          </Typography>
                        }
                        secondary={
                          <Typography
                            variant="caption"
                            sx={{
                              fontWeight: 700,
                              textTransform: "uppercase",
                              color: "text.disabled",
                            }}
                          >
                            {emp.role || "Server"}
                          </Typography>
                        }
                      />
                      <Checkbox
                        edge="end"
                        checked={isSelected}
                        sx={{
                          color: "grey.500",
                          "&.Mui-checked": { color: "#f97316" },
                        }}
                        icon={
                          <Box
                            sx={{
                              width: 24,
                              height: 24,
                              border: "2px solid #9E9E9E",
                              borderRadius: 0.5,
                              color: "white",
                            }}
                          />
                        }
                        checkedIcon={
                          <Box
                            sx={{
                              width: 24,
                              height: 24,
                              bgcolor: "#f97316",
                              borderRadius: 0.5,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Check size={16} color="white" strokeWidth={4} />
                          </Box>
                        }
                      />
                    </Box>
                  </ListItem>
                );
              })}
            </List>
          ) : (
            <Box sx={{ py: 10, textAlign: "center" }}>
              <Typography
                variant="body2"
                sx={{ fontStyle: "italic", color: "text.disabled" }}
              >
                No available staff found.
              </Typography>
            </Box>
          )}
        </Box>
      </DialogContent>

      {/* Actions */}
      <DialogActions sx={{ p: 3, gap: 1 }}>
        <Button
          onClick={onClose}
          fullWidth
          sx={{
            fontWeight: 900,
            bgcolor: "oklch(92.9% 0.013 255.508)",
            color: "text.secondary",
            textTransform: "uppercase",
            letterSpacing: 1,
            fontSize: "0.75rem",
            py: 1.5,
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          disabled={selectedEmployees.length === 0 || isSubmitting}
          variant="contained"
          fullWidth
          disableElevation
          sx={{
            py: 1.5,
            color: "white",
            bgcolor: "#f97316",
            fontWeight: 900,
            borderRadius: 1.5,
            "&:hover": { bgcolor: "#ea580c" },
            "&:disabled": { bgcolor: "grey.200" },
          }}
        >
          {isSubmitting ? (
            <CircularProgress size={20} sx={{ color: "white" }} />
          ) : (
            `Assign ${selectedEmployees.length} Members`
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
