import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StickyTitle = styled(Typography)(({ theme }) => ({
  position: "sticky",
  top: "64px",
  margin: "1rem 0",
  padding: "0.5rem 0",
  background: "rgba(255, 255, 255, 0.8)",
  zIndex: 1060,
  fontSize: "1.25rem",
  fontWeight: "700",
  textTransform: "uppercase",

  [theme.breakpoints.down("sm")]: {
    top: "56px",
  },
}));
