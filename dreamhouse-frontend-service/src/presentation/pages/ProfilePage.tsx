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
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HomeIcon from '@mui/icons-material/Home';

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
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

export const ProfilePage = memo(() => {
  const { formatMessage } = useIntl();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<any>(null);
  const [favorites, setFavorites] = useState<any[]>([]);
  const [listings, setListings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch('http://localhost:8081/profiles/me');
        if (!response.ok) throw new Error('Failed to fetch profile');
        const data = await response.json();
        setProfile(data);
        
        // Fetch favorites and listings here when the endpoints are available
        // setFavorites(favoritesData);
        // setListings(listingsData);
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
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
        <Box className="px-[50px] py-8">
          <Paper elevation={3} className="p-6">
            <Grid container spacing={4}>
              <Grid item xs={12} md={4} className="flex flex-col items-center">
                <Avatar
                  src={profile?.photoUrl}
                  sx={{ width: 150, height: 150, mb: 2 }}
                />
                <Typography variant="h5" gutterBottom>
                  {profile?.name || 'User Name'}
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
        </Box>
      </WebsiteLayout>
    </Fragment>
  );
}); 