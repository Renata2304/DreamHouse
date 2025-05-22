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
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';  // <-- Import user icon

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
  // removed photoUrl and imagePath since not used now
}

interface Listing {
  id: string;
  title: string;
  location: string;
  price: number;
  // removed imageUrl
}

export const ProfilePage = memo(() => {
  const { formatMessage } = useIntl();
  const navigate = useNavigate();

  const [profile, setProfile] = useState<Profile | null>(null);
  const [favorites, setFavorites] = useState<Listing[]>([]);
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [tabValue, setTabValue] = useState(0);

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await fetch('http://localhost:8000/users/profiles/me', {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (res.status === 404) {
          const payload = JSON.parse(atob(token.split('.')[1]));
          const userId = payload.sub;
          const username = payload.preferred_username || payload.username || 'User';

          const createRes = await fetch(`http://localhost:8000/users/profiles/${userId}`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username }),
          });

          if (!createRes.ok) {
            const errData = await createRes.json();
            throw new Error(errData.errorMessage?.message || 'Failed to create profile');
          }

          const createdProfile = await createRes.json();
          setProfile(createdProfile);
        } else if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.errorMessage?.message || 'Failed to fetch profile');
        } else {
          const profileData = await res.json();
          setProfile(profileData);
        }
      } catch (error: any) {
        console.error('Error fetching profile:', error.message || error);
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
        const payload = JSON.parse(atob(token.split('.')[1]));
        const userId = payload.sub;

        const res = await fetch(`http://localhost:8000/listings/listing/byUser/${userId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (res.ok) {
          const listingsData = await res.json();
          setListings(listingsData); // Just set raw listings, no images
        }
      } catch (error) {
        console.error("Failed to fetch listings:", error);
      }
    };

    const fetchFavorites = async () => {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const userId = payload.sub;

        const res = await fetch(`http://localhost:8000/listings/favorites/favorites/user/${userId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (res.ok) {
          const favoritesData = await res.json();
          const simpleFavorites = favoritesData.map((fav: { listing: Listing }) => fav.listing);
          setFavorites(simpleFavorites); // No images
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
              Profile
            </Typography>

            <Grid container spacing={4}>
              <Grid item xs={12} md={4} className="flex flex-col items-center">
                {/* Replace Avatar with icon */}
                <Box sx={{ mb: 2 }}>
                  <AccountCircleIcon sx={{ fontSize: 150, color: 'gray' }} />
                </Box>
                <Typography variant="h5" gutterBottom>
                  {profile?.name || profile?.username || 'User Name'}
                </Typography>
                <Typography variant="body1" color="text.secondary" className="text-center mb-4">
                  {profile?.bio || 'No bio available'}
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<EditIcon />}
                  onClick={() => navigate('/profile/edit')}
                >
                  Edit Profile
                </Button>
              </Grid>

              <Grid item xs={12} md={8}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <Tabs value={tabValue} onChange={handleTabChange}>
                    <Tab icon={<FavoriteIcon />} label="Favorites" />
                    <Tab icon={<HomeIcon />} label="My Listings" />
                  </Tabs>
                </Box>

                <TabPanel value={tabValue} index={0}>
                  {favorites.length > 0 ? (
                    <Grid container spacing={3}>
                      {favorites.map((listing) => (
                        <Grid item xs={12} sm={6} md={4} key={listing.id}>
                          <Card>
                            {/* Removed CardMedia (image) */}
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
                            </CardContent>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  ) : (
                    <Typography variant="body1" className="text-center">
                      No favorites yet
                    </Typography>
                  )}
                </TabPanel>

                <TabPanel value={tabValue} index={1}>
                  {listings.length > 0 ? (
                    <Grid container spacing={3}>
                      {listings.map((listing) => (
                        <Grid item xs={12} sm={6} md={4} key={listing.id}>
                          <Card>
                            {/* Removed CardMedia (image) */}
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
                            </CardContent>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  ) : (
                    <Typography variant="body1" className="text-center">
                      No listings yet
                    </Typography>
                  )}
                </TabPanel>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </WebsiteLayout>
    </Fragment>
  );
});
