import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper } from '@mui/material';
import React, { useState } from 'react';

export default function BorderDialog() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open dialog with border
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <Paper sx={{ border: '2px solid gray' }}>
          <DialogTitle>Dialog with border</DialogTitle>
          <DialogContent>
            <DialogContentText>This is an example of a dialog with a border.</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Paper>
      </Dialog>
    </div>
  );
}
