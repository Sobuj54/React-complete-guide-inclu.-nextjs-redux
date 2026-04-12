import { colorType } from "@/types";
import { IconButton, Tooltip } from "@mui/material";
import { LucideIcon } from "lucide-react";

/**
 * @param {node} icon - The Lucide icon component
 * @param {string} title - Tooltip text (e.g., "Edit User")
 * @param {string} colorType - 'primary', 'error', 'success', etc.
 * @param {function} onClick - Click handler
 */

interface ActionButtonProps {
  icon: LucideIcon;
  title: string;
  colorType: colorType;
  onClick: () => void;
}

export default function ActionButton({
  icon: Icon,
  title,
  colorType = "primary",
  onClick,
}: ActionButtonProps) {
  return (
    <Tooltip title={title} arrow>
      <IconButton
        onClick={onClick}
        sx={{
          // Uses your theme's .lighter and .main colors
          bgcolor: `${colorType}.lighter`,
          color: `${colorType}.main`,
          borderRadius: "5px", // Matches your theme shape
          p: 1,
          transition: "all 0.2s",
          "&:hover": {
            bgcolor: `${colorType}.main`,
            color: "white",
          },
        }}
      >
        <Icon size={18} />
      </IconButton>
    </Tooltip>
  );
}
