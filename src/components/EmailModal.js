import React from "react";

import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

export const EmailModal = ({
  showModal,
  handleModalClose,
  email,
  handleEmailChange,
  isValidEmail,
  handleEmailSubmit,
}) => {
  return (
    <Dialog
      open={showModal}
      onClose={handleModalClose}
      fullWidth="md"
      maxWidth="md"
    >
      <DialogTitle>Send the insights on my email</DialogTitle>
      <DialogContent>
        <DialogContentText>Submit your email</DialogContentText>
        <TextField
          id="outlined-basic"
          label="Email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={handleEmailChange}
          error={!isValidEmail}
          helperText={!isValidEmail && "Invalid email format"}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleEmailSubmit}
          className="bg-[#ADB5BD] hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded"
        >
          Send
        </Button>
        {/* <Button
                onClick={handleModalClose}
                className="bg-[#ADB5BD] hover:bg-red-800 text-white font-bold py-2 px-4 mt-4 rounded"
              >
                Cancel
              </Button> */}
      </DialogActions>
    </Dialog>
  );
};
