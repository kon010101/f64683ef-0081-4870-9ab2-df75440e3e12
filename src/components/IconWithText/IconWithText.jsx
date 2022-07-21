import React from "react";
import { Avatar, Typography } from "@mui/material";
import { Box } from "@mui/system";

const IconWithText = ({ title }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        marginBottom: "1rem",
        height: "80px",
      }}
    >
      <Avatar sx={{ marginRight: "0.5rem" }}>Hi</Avatar>
      <Typography sx={{ fontWeight: "700" }} align="left">
        {title}
      </Typography>
    </Box>
  );
};

export default IconWithText;
