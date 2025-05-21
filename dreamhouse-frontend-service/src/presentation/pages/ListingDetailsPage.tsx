import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Paper,
  Typography,
  Button,
  Grid,
  CircularProgress,
  Divider,
} from "@mui/material";
import { WebsiteLayout } from "presentation/layouts/WebsiteLayout";
import { Seo } from "@presentation/components/ui/Seo";
import { useIntl } from "react-intl";

export const ListingDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { formatMessage } = useIntl();
  const [listing, setListing] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListingDetails = async () => {
      try {
        const response = await fetch(`http://dreamhouse-api-gateway:8000/listings/listing/${id}`);
        if (!response.ok) throw new Error('Failed to fetch listing details');
        const data = await response.json();
        setListing(data);
      } catch (error) {
        console.error('Error fetching listing details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchListingDetails();
  }, [id]);

  if (loading) {
    return (
      <WebsiteLayout>
        <Box className="flex justify-center items-center h-screen">
          <CircularProgress />
        </Box>
      </WebsiteLayout>
    );
  }

  if (!listing) {
    return (
      <WebsiteLayout>
        <Box className="px-[50px] py-6">
          <Typography variant="h5" color="error">
            Listing not found
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate('/listings')}
            className="mt-4"
          >
            Back to Listings
          </Button>
        </Box>
      </WebsiteLayout>
    );
  }

  return (
    <>
      <Seo title={`${listing.title} - DreamHouse`} />
      <WebsiteLayout>
        <Box className="px-[50px] py-6">
          <Paper elevation={3} className="p-6">
            <Typography variant="h4" gutterBottom>
              {listing.title}
            </Typography>
            <Divider className="my-4" />
            
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" color="text.secondary">
                  Location
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {listing.location}
                </Typography>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" color="text.secondary">
                  Price
                </Typography>
                <Typography variant="body1" gutterBottom>
                  €{listing.price}
                </Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" color="text.secondary">
                  Surface Area
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {listing.surface} m²
                </Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" color="text.secondary">
                  Number of Rooms
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {listing.rooms}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="subtitle1" color="text.secondary">
                  Description
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {listing.description}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Box className="flex justify-end space-x-4">
                  <Button
                    variant="outlined"
                    onClick={() => navigate('/listings')}
                  >
                    Back to Listings
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </WebsiteLayout>
    </>
  );
}; 