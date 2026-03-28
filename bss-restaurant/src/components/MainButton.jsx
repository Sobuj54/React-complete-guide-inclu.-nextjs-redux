import { Button } from "@mui/material";

/**
 * @param {string} label - The text to display
 * @param {string} color - MUI palette color (primary, secondary, error, etc.)
 * @param {node} startIcon - Optional Lucide icon to show before text
 * @param {function} onClick - Click handler
 */
export default function MainButton({
  label,
  color = "primary",
  startIcon,
  onClick,
  ...props
}) {
  return (
    <Button
      variant="contained"
      color={color}
      startIcon={startIcon}
      onClick={onClick}
      sx={{
        textTransform: "none", // Keeps text from being all caps
        fontWeight: 600,
        px: 3,
        py: 1,
        boxShadow: "none",
        "&:hover": {
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        },
      }}
      {...props}
    >
      {label}
    </Button>
  );
}
