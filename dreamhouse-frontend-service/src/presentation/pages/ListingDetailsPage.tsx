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
  IconButton,
} from "@mui/material";
import { WebsiteLayout } from "presentation/layouts/WebsiteLayout";
import { Seo } from "@presentation/components/ui/Seo";
import { useIntl } from "react-intl";
import { Listing } from "../../api/listings/models/Listing";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

function getUserIdFromToken(token: string | null): string | null {
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload?.sub || payload?.id || null;
  } catch (e) {
    return null;
  }
}

export const ListingDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { formatMessage } = useIntl();
  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const token = localStorage.getItem("token");
  const userId = getUserIdFromToken(token);

  useEffect(() => {
    const fetchListingDetails = async () => {
      if (!id) {
        setError("No listing ID provided");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`http://localhost:8000/listings/listing/getListingDetails/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(errorText || "Failed to fetch listing details");
        }

        const data: Listing = await response.json();
        setListing(data);
      } catch (error) {
        console.error("Error fetching listing details:", error);
        setError("Failed to fetch listing details");
      } finally {
        setLoading(false);
      }
    };

    fetchListingDetails();
  }, [id, token]);

  if (loading) {
    return (
      <WebsiteLayout>
        <Box className="flex justify-center items-center h-screen">
          <CircularProgress />
        </Box>
      </WebsiteLayout>
    );
  }

  if (error || !listing) {
    return (
      <WebsiteLayout>
        <Box className="px-[50px] py-6">
          <Typography variant="h5" color="error">
            {error || "Listing not found"}
          </Typography>
          <Button variant="contained" onClick={() => navigate("/listings")} className="mt-4">
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
                  <Button variant="outlined" onClick={() => navigate("/listings")}>
                    Back to Listings
                  </Button>

                  {listing.owner?.id === userId ? (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => navigate(`/listings/edit/${listing.id}`)}
                    >
                      Edit Listing
                    </Button>
                  ) : (
                    <IconButton 
                      color="primary" 
                      onClick={async () => {
                        try {
                          const response = await fetch(`http://localhost:8000/favorites/add?listingId=${listing.id}`, {
                            method: 'POST',
                            headers: {
                              'Authorization': `Bearer ${token}`,
                              'Content-Type': 'application/json',
                            },
                          });
                      
                          if (response.ok) {
                            setIsFavorite(!isFavorite);
                          } else {
                            const contentType = response.headers.get("content-type");
                            const errorData = contentType?.includes("application/json") ? await response.json() : await response.text();
                            console.error("Failed to update favorites:", errorData);
                          }
                        } catch (error) {
                          console.error("Error adding to favorites:", error);
                        }
                      }}                      
                    >
                      {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                    </IconButton>
                  )}
                </Box>
              </Grid>

            </Grid>
          </Paper>
        </Box>
      </WebsiteLayout>
    </>
  );
};
