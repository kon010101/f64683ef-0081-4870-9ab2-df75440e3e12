import React, { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Box } from "@mui/system";
import ImageModal from "../ImageModal/ImageModal";

const Image = ({ url, alt }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  return (
    <>
      <Box
        sx={{ height: "350px", overflow: "hidden", cursor: "pointer" }}
        onClick={openModal}
      >
        <LazyLoadImage effect="opacity" src={url} alt={alt} height="350" />;
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
