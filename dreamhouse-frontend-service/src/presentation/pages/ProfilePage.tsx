import { WebsiteLayout } from "presentation/layouts/WebsiteLayout";
import { Fragment, memo, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { Seo } from "@presentation/components/ui/Seo";
import {
  Box,
  Typography,
  Avatar,
  Paper,
  Grid,
  Card,
  CardContent,
  Button,
  Tabs,
  Tab,
  CircularProgress,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

interface Profile {
  id: string;
  username: string;
  name?: string;
  bio?: string;
}

interface Listing {
  id: string;
  title: string;
  location: string;
  price: number;
}

export const ProfilePage = memo(() => {
  const { formatMessage } = useIntl();
  const navigate = useNavigate();

  const [profile, setProfile] = useState<Profile | null>(null);
  const [favorites, setFavorites] = useState<Listing[]>([]);
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [tabValue, setTabValue] = useState(0);

  const [openConfirm, setOpenConfirm] = useState(false);
  const [listingToDelete, setListingToDelete] = useState<string | null>(null);
  const [openSuccess, setOpenSuccess] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await fetch("http://localhost:8000/users/profiles/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.status === 404) {
          const payload = JSON.parse(atob(token.split(".")[1]));
          const userId = payload.sub;
          const username =
            payload.preferred_username || payload.username || "User";

          const createRes = await fetch(
            `http://localhost:8000/users/profiles/${userId}`,
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ username }),
            }
          );

          if (!createRes.ok) {
            const errData = await createRes.json();
            throw new Error(
              errData.errorMessage?.message || "Failed to create profile"
            );
          }

          const createdProfile = await createRes.json();
          setProfile(createdProfile);
        } else if (!res.ok) {
          const errData = await res.json();
          throw new Error(
            errData.errorMessage?.message || "Failed to fetch profile"
          );
        } else {
          const profileData = await res.json();
          setProfile(profileData);
        }
      } catch (error: any) {
        console.error("Error fetching profile:", error.message || error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  useEffect(() => {
    if (!token) return;

    const fetchListings = async () => {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        const userId = payload.sub;

        const res = await fetch(
          `http://localhost:8000/listings/listing/byUser/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (res.ok) {
          const listingsData = await res.json();
          setListings(listingsData);
        }
      } catch (error) {
        console.error("Failed to fetch listings:", error);
      }
    };

    const fetchFavorites = async () => {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        const userId = payload.sub;

        const res = await fetch(
          `http://localhost:8000/listings/favorites/favorites/user/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (res.ok) {
          const favoritesData = await res.json();
          const simpleFavorites = favoritesData.map(
            (fav: { listing: Listing }) => fav.listing
          );
          setFavorites(simpleFavorites);
        }
      } catch (error) {
        console.error("Failed to fetch favorites:", error);
      }
    };

    fetchListings();
    fetchFavorites();
  }, [token]);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const confirmDelete = (id: string) => {
    setListingToDelete(id);
    setOpenConfirm(true);
  };

  const handleDeleteListing = async () => {
    if (!listingToDelete) return;

    try {
      const res = await fetch(
        `http://localhost:8000/listings/listing/deleteListing/${listingToDelete}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data?.error?.message || "Failed to delete listing.");
      }

      setListings((prev) => prev.filter((l) => l.id !== listingToDelete));
      setOpenSuccess(true);
    } catch (error: any) {
      console.error("Delete failed:", error.message);
      alert("Error deleting listing: " + error.message);
    } finally {
      setOpenConfirm(false);
      setListingToDelete(null);
    }
  };

  if (loading) {
    return (
      <WebsiteLayout>
        <Box className="flex justify-center items-center h-screen">
          <CircularProgress />
        </Box>
      </WebsiteLayout>
    );
  }

  return (
    <Fragment>
      <Seo title="DreamHouse | Profile" />
      <WebsiteLayout>
        <Container maxWidth="md" sx={{ mt: 4 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
              {formatMessage({ id: "profile.title", defaultMessage: "Profile" })}
            </Typography>

            <Grid container spacing={4}>
              <Grid item xs={12} md={4} className="flex flex-col items-center">
                <Box sx={{ mb: 2 }}>
                  <AccountCircleIcon sx={{ fontSize: 150, color: "gray" }} />
                </Box>
                <Typography variant="h5" gutterBottom>
                  {profile?.name?.trim() !== ""
                    ? profile?.name
                    : profile?.username || "User Name"}
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  className="text-center mb-4"
                >
                  {profile?.bio ||
                    formatMessage({
                      id: "profile.noBio",
                      defaultMessage: "No bio available",
                    })}
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<EditIcon />}
                  onClick={() => navigate("/profile/edit")}
                >
                  {formatMessage({ id: "button.editProfile", defaultMessage: "Edit Profile" })}
                </Button>
              </Grid>

              <Grid item xs={12} md={8}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <Tabs value={tabValue} onChange={handleTabChange}>
                    <Tab
                      icon={<FavoriteIcon />}
                      label={formatMessage({ id: "tab.favorites", defaultMessage: "Favorites" })}
                    />
                    <Tab
                      icon={<HomeIcon />}
                      label={formatMessage({ id: "tab.myListings", defaultMessage: "My Listings" })}
                    />
                  </Tabs>
                </Box>

                <TabPanel value={tabValue} index={1}>
                  {listings.length > 0 ? (
                    <Grid container spacing={3}>
                      {listings.map((listing) => (
                        <Grid item xs={12} sm={6} md={4} key={listing.id}>
                          <Card>
                            <CardContent>
                              <Typography gutterBottom variant="h6">
                                {listing.title}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {listing.location}
                              </Typography>
                              <Typography variant="h6" color="primary">
                                €{listing.price}
                              </Typography>
                              <Box mt={2} display="flex" justifyContent="space-between">
                                <Button
                                  size="small"
                                  variant="outlined"
                                  startIcon={<EditIcon />}
                                  onClick={() => navigate(`/listings/edit/${listing.id}`)}
                                >
                                  {formatMessage({ id: "button.edit", defaultMessage: "Edit" })}
                                </Button>

                                <Button
                                  size="small"
                                  variant="outlined"
                                  color="error"
                                  onClick={() => confirmDelete(listing.id)}
                                >
                                  {formatMessage({ id: "button.delete", defaultMessage: "Delete" })}
                                </Button>
                              </Box>
                            </CardContent>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  ) : (
                    <Typography variant="body1" className="text-center">
                      {formatMessage({
                        id: "profile.noListings",
                        defaultMessage: "No listings yet",
                      })}
                    </Typography>
                  )}
                </TabPanel>
              </Grid>
            </Grid>
          </Paper>
        </Container>

        {/* Confirm Deletion Dialog */}
        <Dialog open={openConfirm} onClose={() => setOpenConfirm(false)}>
          <DialogTitle>
            {formatMessage({ id: "confirm.delete.title", defaultMessage: "Confirm Deletion" })}
          </DialogTitle>
          <DialogContent>
            <Typography>
              {formatMessage({
                id: "confirm.delete.message",
                defaultMessage: "Are you sure you want to delete this listing?",
              })}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenConfirm(false)}>
              {formatMessage({ id: "button.cancel", defaultMessage: "Cancel" })}
            </Button>
            <Button onClick={handleDeleteListing} color="error" variant="contained">
              {formatMessage({ id: "button.delete", defaultMessage: "Delete" })}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Success Dialog */}
        <Dialog open={openSuccess} onClose={() => setOpenSuccess(false)}>
          <DialogTitle>
            {formatMessage({
              id: "listing.deleted.title",
              defaultMessage: "Listing Deleted",
            })}
          </DialogTitle>
          <DialogContent>
            <Typography>
              {formatMessage({
                id: "listing.deleted.message",
                defaultMessage: "The listing was successfully deleted.",
              })}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenSuccess(false)}>
              {formatMessage({ id: "button.ok", defaultMessage: "OK" })}
            </Button>
          </DialogActions>
        </Dialog>
      </WebsiteLayout>
    </Fragment>
  );
});
