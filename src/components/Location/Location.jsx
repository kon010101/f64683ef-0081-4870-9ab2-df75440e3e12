import React from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Link, Typography } from "@mui/material";

const Location = ({ name, url }) => {
  return (
    <Link sx={{ display: "flex" }} href={url} target="_blank">
      <LocationOnIcon color="primary" />
      <Typography>{name}</Typography>
    </Link>
  );
};

export default Location;
