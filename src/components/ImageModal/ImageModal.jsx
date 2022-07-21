import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { modalStyle } from "./styles";

export default function ImageModal({ modalOpen, setModalOpen, src, alt }) {
  const handleClose = () => setModalOpen(false);

  return (
    <div>
      <Modal
        open={modalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <img src={src} alt={alt} onClick={handleClose} />
        </Box>
      </Modal>
    </div>
  );
}
