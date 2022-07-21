import React, { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Box } from "@mui/system";
import ImageModal from "../ImageModal/ImageModal";
import "react-lazy-load-image-component/src/effects/blur.css";

const Image = ({ url, alt }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  return (
    <>
      <Box
        sx={{
          height: "350px",
          overflow: "hidden",
          cursor: "pointer",
          marginBottom: "1rem",
        }}
        onClick={openModal}
      >
        <LazyLoadImage effect="blur" src={url} alt={alt} height="350" />;
      </Box>
      <ImageModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        src={url}
        alt={alt}
      />
    </>
  );
};

export default Image;
