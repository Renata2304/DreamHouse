import { WebsiteLayout } from "presentation/layouts/WebsiteLayout";
import { Fragment, memo, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Grid,
  CircularProgress,
  Container,
  ToggleButton,
  ToggleButtonGroup
} from "@mui/material";
import { toast } from "react-toastify";
import { Seo } from "@presentation/components/ui/Seo";

export const EditListingPage = memo(() => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    surface: "",
    rooms: "",
    imageUrl: "",
    status: "sale", // default: "sale" or "rent"
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const res = await fetch(`http://localhost:8000/listings/listing/getListingDetails/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error("Failed to fetch listing");
        const data = await res.json();
        setFormData({
          title: data.title,
          description: data.description,
          price: String(data.price),
          location: data.location,
          surface: String(data.surface),
          rooms: String(data.rooms),
          imageUrl: data.imageUrl || "",
          status: data.status || "sale",
        });
      } catch (err) {
        console.error(err);
        toast.error("Error loading listing data");
      }
    };

    if (id && token) fetchListing();
  }, [id, token]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleStatusChange = (
    _: React.MouseEvent<HTMLElement>,
    newStatus: string | null
  ) => {
    if (newStatus !== null) {
      setFormData((prev) => ({
        ...prev,
        status: newStatus,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8000/listings/listing/editListing/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          price: Number(formData.price),
          surface: Number(formData.surface),
          rooms: Number(formData.rooms),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update listing");
      }

      toast.success("Listing updated successfully");
      navigate("/profile");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update listing");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Fragment>
      <Seo title="Edit Listing" />
      <WebsiteLayout>
        <Container maxWidth="md" sx={{ mt: 4 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
              Edit Listing
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
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Image URL"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" gutterBottom>
                    Listing Type
                  </Typography>
                  <ToggleButtonGroup
                    value={formData.status}
                    exclusive
                    onChange={handleStatusChange}
                    fullWidth
                  >
                    <ToggleButton value="sale">For Sale</ToggleButton>
                    <ToggleButton value="rent">For Rent</ToggleButton>
                  </ToggleButtonGroup>
                </Grid>
                <Grid item xs={12} className="flex justify-end space-x-4">
                  <Button
                    variant="outlined"
                    onClick={() => navigate("/profile")}
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
                    {loading ? "Saving..." : "Save Changes"}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Container>
      </WebsiteLayout>
    </Fragment>
  );
});
