"use client";
import { ClickAwayListener, Tooltip } from "@mui/material";
import React, { useState } from "react";

const ResponsiveTooltip = ({
  title,
  children,
  id,
}: {
  title: string;
  children: React.ReactNode;
  id: string;
}) => {
  const [openTooltip, setOpenTooltip] = useState<string | null>(null);
  const handleTooltipClose = () => setOpenTooltip(null);
  const handleTooltipOpen = (id: string) => setOpenTooltip(id);

  return (
    <ClickAwayListener onClickAway={handleTooltipClose}>
      <div style={{ display: "inline-block", maxWidth: "100%" }}>
        <Tooltip
          title={title}
          arrow
          disableFocusListener
          disableTouchListener
          onClose={handleTooltipClose}
          open={openTooltip === id}
          onOpen={() => handleTooltipOpen(id)}
          slotProps={{
            popper: {
              modifiers: [{ name: "offset", options: { offset: [0, -10] } }],
            },
          }}
        >
          <div onClick={() => handleTooltipOpen(id)}>{children}</div>
        </Tooltip>
      </div>
    </ClickAwayListener>
  );
};
export default ResponsiveTooltip;
