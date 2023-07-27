"use client";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "1px solid #ddd",
  boxShadow: 24,
  paddingTop: 1,
  paddingLeft: 1,
  paddingRight: 1,
  paddingBottom: 0.5,
  borderRadius: "10px",
  overflow: "hidden",
};

export default function ModalDialog({
  children,
  open = false,
  modalWidth = 300,
  handleClose,
}: {
  open: boolean;
  children: React.ReactNode;
  modalWidth: number;
  handleClose: any;
}) {
  const stylin = { ...style, width: modalWidth };
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box sx={stylin}>{children}</Box>
      </Fade>
    </Modal>
  );
}
