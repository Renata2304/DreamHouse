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
  CardMedia,
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
import ImageUpload from '../components/ImageUpload';

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
  photoUrl?: string;
  imagePath?: string;
}

interface Listing {
  id: string;
  title: string;
  location: string;
  price: number;
  imageUrl: string;
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
      if (!token) return;
    
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const userId = payload.sub;
    
        const res = await fetch(`http://localhost:8000/listing/getByUser/${userId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
    
        if (res.ok) {
          const listingsData = await res.json();
    
          const listingsWithImages = await Promise.all(
            listingsData.map(async (listing: Listing) => {
              const imgRes = await fetch(`http://localhost:8000/images/byListing/${listing.id}`, {
                headers: { 'Authorization': `Bearer ${token}` }
              });
              const images = await imgRes.json();
              return {
                ...listing,
                imageUrl: images?.[0]?.imagePath
                  ? `http://localhost:8000/files/listings/${images[0].imagePath}`
                  : undefined,
              };
            })
          );
    
          setListings(listingsWithImages);
        }
      } catch (error) {
        console.error("Failed to fetch listings:", error);
      }
    };
    
    const fetchFavorites = async () => {
      if (!token) return;
    
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const userId = payload.sub;
    
        const res = await fetch(`http://localhost:8000/favorites/getByUser/${userId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
    
        if (res.ok) {
          const favoritesData = await res.json();
    
          const favoritesWithImages = await Promise.all(
            favoritesData.map(async (fav: { listing: Listing }) => {
              const listing = fav.listing;
              const imgRes = await fetch(`http://localhost:8000/images/byListing/${listing.id}`, {
                headers: { 'Authorization': `Bearer ${token}` }
              });
              const images = await imgRes.json();
              return {
                ...listing,
                imageUrl: images?.[0]?.imagePath
                  ? `http://localhost:8000/files/listings/${images[0].imagePath}`
                  : undefined,
              };
            })
          );
    
          setFavorites(favoritesWithImages);
        }
      } catch (error) {
        console.error("Failed to fetch favorites:", error);
      }
    };

    fetchListings();
    fetchFavorites();
  }, [token]);

  const handleImageUpload = async (file: File) => {
    if (!token) return;

    const formData = new FormData();
    formData.append('image', file);

    const res = await fetch('http://localhost:8000/users/profiles/image', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` },
      body: formData,
    });

    if (!res.ok) {
      throw new Error('Failed to upload image');
    }

    // Refresh profile after upload
    const updatedProfile = await res.json();
    setProfile(updatedProfile);
  };

  const handleImageDelete = async () => {
    if (!token) return;

    const res = await fetch('http://localhost:8000/users/profiles/image', {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (!res.ok) {
      throw new Error('Failed to delete image');
    }

    // Refresh profile after delete
    if (profile) {
      setProfile({ ...profile, imagePath: undefined, photoUrl: undefined });
    }
  };

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

            <ImageUpload
              type="profile"
              onUpload={handleImageUpload}
              onDelete={handleImageDelete}
              currentImageUrl={profile?.imagePath ? `http://localhost:8000/files/profiles/${profile.imagePath}` : undefined}
              token={token || ''}
            />

            <Grid container spacing={4}>
              <Grid item xs={12} md={4} className="flex flex-col items-center">
                <Avatar
                  src={profile?.photoUrl || (profile?.imagePath ? `http://localhost:8000/files/profiles/${profile.imagePath}` : undefined)}
                  sx={{ width: 150, height: 150, mb: 2 }}
                />
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
                            <CardMedia
                              component="img"
                              height="140"
                              image={listing.imageUrl}
                              alt={listing.title}
                            />
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
                            <CardMedia
                              component="img"
                              height="140"
                              image={listing.imageUrl}
                              alt={listing.title}
                            />
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
