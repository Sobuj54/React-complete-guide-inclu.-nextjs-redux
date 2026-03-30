import React from "react";
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
import MainButton from "../MainButton";

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
}) {
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
          bgcolor: "secondary.100", // This is the Slate 100 hex value
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

      <DialogContent dividers sx={{ py: 2, borderTop: "1px solid #f0f0f0" }}>
        <Typography
          variant="body2"
          sx={{ mb: 2, fontWeight: 600, color: "#595959" }}
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
            <List sx={{ width: "100%", p: 0 }}>
              {staff.map((emp) => {
                // IMPORTANT: Match the employeeId from this list to the id in your map
                const currentId = emp.employeeId;
                const isSelected = selectedEmployees.includes(currentId);

                // Look up image filename using the ID
                const imageFileName = imageMap[currentId];

                return (
                  <ListItem
                    key={currentId}
                    disablePadding
                    sx={{
                      mb: 2.5,
                      // border: "1px solid white",
                      borderColor: isSelected
                        ? "primary.light"
                        : "secondary.light",
                      bgcolor: isSelected ? "primary.lighter" : "white",
                      borderRadius: "5px",
                      transition: "all 0.2s",
                      "&:hover": {
                        bgcolor: isSelected ? "#bae0ff" : "#f5f5f5",
                        borderColor: isSelected ? "#69b1ff" : "#d9d9d9",
                      },
                      // boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                    }}
                    className="rounded-md shadow-md"
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
                              ? `${import.meta.env.VITE_IMG_URL}/images/user/${imageFileName}`
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
                          <Typography
                            sx={{
                              fontWeight: 700,
                              color: "#262626",
                              font: "20px",
                              textTransform: "capitalize",
                            }}
                          >
                            {emp.name}
                          </Typography>
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

      <DialogActions sx={{ p: 3, gap: 2 }}>
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
