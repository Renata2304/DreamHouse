import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  Select,
  MenuItem,
  Checkbox,
  IconButton,
  Fab,
  Box,
} from '@mui/material';
import FeedbackIcon from '@mui/icons-material/Feedback';
import { useSnackbar } from 'notistack';
import axios from 'axios';

interface FeedbackFormProps {
  position?: {
    bottom?: number | string;
    right?: number | string;
  };
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ position }) => {
  const [open, setOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [formData, setFormData] = useState({
    satisfactionLevel: 'satisfied',
    category: '',
    comments: '',
    wantUpdates: false,
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log('Submitting feedback:', formData);
      const response = await axios.post('http://localhost:8082/api/feedback', formData, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      console.log('Feedback submission response:', response.data);
      enqueueSnackbar('Feedback submitted successfully!', { variant: 'success' });
      handleClose();
      setFormData({
        satisfactionLevel: 'satisfied',
        category: '',
        comments: '',
        wantUpdates: false,
      });
    } catch (error: any) {
      console.error('Feedback submission error:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Failed to submit feedback';
      enqueueSnackbar(errorMessage, {
        variant: 'error',
        autoHideDuration: 5000
      });
    }
  };

  return (
    <>
      <Box sx={{ position: 'fixed', ...position }}>
        <Fab
          color="primary"
          aria-label="feedback"
          onClick={handleOpen}
          sx={{ margin: 2 }}
        >
          <FeedbackIcon />
        </Fab>
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Provide Feedback</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <FormControl fullWidth margin="normal">
              <Select
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                displayEmpty
                required
                label="Category"
              >
                <MenuItem value="" disabled>
                  Select a category
                </MenuItem>
                <MenuItem value="website">Website Experience</MenuItem>
                <MenuItem value="properties">Property Listings</MenuItem>
                <MenuItem value="support">Customer Support</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </FormControl>

            <FormControl component="fieldset" margin="normal">
              <RadioGroup
                value={formData.satisfactionLevel}
                onChange={(e) =>
                  setFormData({ ...formData, satisfactionLevel: e.target.value })
                }
              >
                <FormControlLabel
                  value="satisfied"
                  control={<Radio />}
                  label="Satisfied"
                />
                <FormControlLabel
                  value="neutral"
                  control={<Radio />}
                  label="Neutral"
                />
                <FormControlLabel
                  value="dissatisfied"
                  control={<Radio />}
                  label="Dissatisfied"
                />
              </RadioGroup>
            </FormControl>

            <TextField
              fullWidth
              multiline
              rows={4}
              margin="normal"
              label="Comments"
              value={formData.comments}
              onChange={(e) =>
                setFormData({ ...formData, comments: e.target.value })
              }
              required
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.wantUpdates}
                  onChange={(e) =>
                    setFormData({ ...formData, wantUpdates: e.target.checked })
                  }
                />
              }
              label="I would like to receive updates about my feedback"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant="contained" color="primary">
              Submit Feedback
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default FeedbackForm;