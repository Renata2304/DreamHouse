import { WebsiteLayout } from "presentation/layouts/WebsiteLayout";
import { Fragment, memo, useState } from "react";
import { useIntl } from "react-intl";
import { Seo } from "@presentation/components/ui/Seo";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Grid,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AddListingPage = memo(() => {
  const { formatMessage } = useIntl();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    surface: "",
    rooms: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://dreamhouse-api-gateway:8000/listings/listing/addListing', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          price: Number(formData.price),
          surface: Number(formData.surface),
          rooms: Number(formData.rooms),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add listing');
      }

      const data = await response.json();
      toast.success('Listing added successfully!');
      navigate('/listings');
    } catch (error) {
      console.error('Error adding listing:', error);
      toast.error('Failed to add listing. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Fragment>
      <Seo title="DreamHouse | Add Listing" />
      <WebsiteLayout>
        <Box className="px-[50px] py-8">
          <Paper elevation={3} className="p-6">
            <Typography variant="h4" gutterBottom>
              Add New Listing
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    multiline
                    rows={4}
                    label="Description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    type="number"
                    label="Price (€)"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="Location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    type="number"
                    label="Surface (m²)"
                    name="surface"
                    value={formData.surface}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    type="number"
                    label="Number of Rooms"
                    name="rooms"
                    value={formData.rooms}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} className="flex justify-end space-x-4">
                  <Button
                    variant="outlined"
                    onClick={() => navigate('/listings')}
                    disabled={loading}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={loading}
                    startIcon={loading ? <CircularProgress size={20} /> : null}
                  >
                    {loading ? 'Adding...' : 'Add Listing'}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Box>
      </WebsiteLayout>
    </Fragment>
  );
}); 