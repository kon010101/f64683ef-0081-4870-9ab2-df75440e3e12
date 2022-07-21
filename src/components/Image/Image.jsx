import React, { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Box } from "@mui/system";

const Image = ({ url, alt }) => {
  return (
    <Box sx={{ height: "350px", overflow: "hidden" }}>
      <LazyLoadImage effect="opacity" src={url} alt={alt} height="350" />;
    </Box>
  );
};

export default Image;
