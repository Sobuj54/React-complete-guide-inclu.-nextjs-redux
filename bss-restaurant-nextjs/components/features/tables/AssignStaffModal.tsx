"use client";

import MainButton from "@/components/ui/button/MainButton";
import ResponsiveTooltip from "@/components/ui/ResponsiveTooltip";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
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
} from "@mui/material";
import { Check, X, Users, User } from "lucide-react";

// Interface for a single Staff Member
interface StaffMember {
  employeeId: string;
  name: string;
  designation?: string;
}

interface AssignStaffModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLoading: boolean;
  staff: StaffMember[];
  selectedEmployees: string[];
  onToggle: (id: string) => void;
  onConfirm: () => Promise<void>; // Server Action call
  isSubmitting: boolean;
  imageMap?: Record<string, string>; // Record is a TS way to define an object with key-value pairs
}

export default function AssignStaffModal({
  isOpen,
  onClose,
  isLoading,
  staff = [],
  selectedEmployees,
  onToggle,
  onConfirm,
  isSubmitting,
  imageMap = {},
}: AssignStaffModalProps) {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          borderRadius: "5px",
          padding: 1,
          bgcolor: "secondary.100",
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pb: 1,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Users size={24} color="#1677ff" />
          <Typography variant="h6" sx={{ fontWeight: 800, color: "#262626" }}>
            Assign Staff
          </Typography>
        </Box>
        <IconButton onClick={onClose} size="small">
          <X size={20} />
        </IconButton>
      </DialogTitle>

      <DialogContent
        dividers
        sx={{
          py: 2,
          borderTop: "1px solid",
          borderColor: "secondary.light",
          px: { xs: 1, md: 1 },
        }}
      >
        <Typography
          variant="body2"
          sx={{
            mb: 2,
            fontWeight: 600,
            color: "#595959",
            ml: { xs: 0, md: 1 },
          }}
        >
          Select staff members to assign to this table:
        </Typography>

        <Box sx={{ minHeight: 200, maxHeight: 400, overflowY: "auto" }}>
          {isLoading ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                py: 8,
                gap: 3,
              }}
            >
              <CircularProgress
                size={32}
                thickness={5}
                sx={{ color: "#1677ff" }}
              />
              <Typography
                variant="caption"
                sx={{ fontWeight: 700, color: "#bfbfbf", letterSpacing: 1 }}
              >
                FETCHING STAFF...
              </Typography>
            </Box>
          ) : staff?.length > 0 ? (
            <List sx={{ width: "100%", p: { xs: 0, md: 1 } }}>
              {staff.map((emp) => {
                const currentId = emp.employeeId;
                const isSelected = selectedEmployees.includes(currentId);
                const imageFileName = imageMap[currentId];

                return (
                  <ListItem
                    key={currentId}
                    disablePadding
                    sx={{
                      mb: 1.5,
                      border: "1px solid",
                      borderColor: isSelected
                        ? "primary.light"
                        : "secondary.light",
                      bgcolor: isSelected ? "primary.lighter" : "white",
                      borderRadius: "5px",
                      transition: "all 0.2s",
                    }}
                  >
                    <Box
                      onClick={() => onToggle(currentId)}
                      sx={{
                        display: "flex",
                        width: "100%",
                        alignItems: "center",
                        p: 2,
                        cursor: "pointer",
                        gap: 1,
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar
                          src={
                            imageFileName
                              ? `${process.env.NEXT_PUBLIC_IMG_URL}/images/user/${imageFileName}`
                              : undefined
                          }
                          sx={{
                            width: 45,
                            height: 45,
                            bgcolor: isSelected ? "#1677ff" : "#d9d9d9",
                            fontWeight: 700,
                          }}
                        >
                          {!imageFileName &&
                            (emp.name?.charAt(0) || <User size={20} />)}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <ResponsiveTooltip title={emp.name} id={currentId}>
                            <Typography
                              sx={{
                                fontWeight: 700,
                                color: "#262626",
                                fontSize: { xs: "14px", md: "16px" }, // Fixed 'font' key to 'fontSize'
                                textTransform: "capitalize",
                                maxWidth: { xs: 100, md: "100%" },
                              }}
                              className="truncate"
                            >
                              {emp.name}
                            </Typography>
                          </ResponsiveTooltip>
                        }
                        secondary={
                          <Typography
                            variant="caption"
                            sx={{
                              fontWeight: 600,
                              color: "#8c8c8c",
                              textTransform: "capitalize",
                            }}
                          >
                            {emp.designation || "Staff Member"}
                          </Typography>
                        }
                      />
                      <Checkbox
                        edge="end"
                        checked={isSelected}
                        disableRipple // Prevents the MUI "circle" ripple on click
                        sx={{ "&.Mui-checked": { color: "#1677ff" } }}
                        icon={
                          <Box
                            sx={{
                              width: 22,
                              height: 22,
                              border: "2px solid #434343",
                              borderRadius: "5px",
                            }}
                          />
                        }
                        checkedIcon={
                          <Box
                            sx={{
                              width: 22,
                              height: 22,
                              bgcolor: "#1677ff",
                              borderRadius: "4px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Check size={14} color="white" strokeWidth={4} />
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
                sx={{ fontStyle: "italic", color: "#bfbfbf" }}
              >
                No available staff found.
              </Typography>
            </Box>
          )}
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: { xs: 1, md: 2 }, gap: 1 }}>
        <MainButton label="Cancel" onClick={onClose} color="secondary" />
        <MainButton
          label={
            isSubmitting
              ? "Assigning..."
              : `Assign ${selectedEmployees.length} Members`
          }
          onClick={onConfirm}
          disabled={selectedEmployees.length === 0 || isSubmitting}
          loading={isSubmitting}
          color="primary"
        />
      </DialogActions>
    </Dialog>
  );
}
