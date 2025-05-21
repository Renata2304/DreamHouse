import { useCallback, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';
import { Link, useNavigate } from 'react-router-dom';
import { AppRoute } from 'routes';
import { useIntl } from 'react-intl';
import { useAppSelector } from '@application/store';
import { IconButton, TextField, InputAdornment, Avatar, Box } from '@mui/material';
import { useOwnUserHasRole } from '@infrastructure/hooks/useOwnUser';
import { UserRoleEnum } from '@infrastructure/apis/client';
import { NavbarLanguageSelector } from '@presentation/components/ui/NavbarLanguageSelector/NavbarLanguageSelector';
import { AuthButtons } from '@presentation/components/ui/AuthButtons/AuthButtons';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
/**
 * This is the navigation menu that will stay at the top of the page.
 */
export const Navbar = () => {
  const { formatMessage } = useIntl();
  const isAdmin = useOwnUserHasRole(UserRoleEnum.Admin);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const { token, loggedIn } = useAppSelector(x => x.profileReducer);

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    
    try {
      const url = `/listings/listing/getByLocation?location=${encodeURIComponent(searchTerm)}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      navigate("/listings", { state: { listings: data } });
    } catch (err) {
      console.error("Search error:", err);
    }
  };

  return <>
    <div className="w-full top-0 z-50 fixed">
      <AppBar position="static" sx={{ backgroundColor: '#8D0909' }}>
        <Toolbar>
          <div className="grid grid-cols-12 gap-y-5 gap-x-10 justify-center items-center w-full">
            <div className="col-span-1">
              <Link to={AppRoute.Index}>
                <IconButton>
                  <HomeIcon style={{ color: 'white' }} fontSize='large' />
                </IconButton>
              </Link>
            </div>
            {isAdmin && <>
              <div className="col-span-1">
                <Button color="inherit">
                  <Link style={{ color: '#8D0909' }} to={AppRoute.Users}>
                    {formatMessage({ id: "globals.users" })}
                  </Link>
                </Button>
              </div>
              <div className="col-span-1">
                <Button color="inherit">
                  <Link style={{ color: '#8D0909' }} to={AppRoute.UserFiles}>
                    {formatMessage({ id: "globals.files" })}
                  </Link>
                </Button>
              </div>
            </>}
            <div className="col-span-4">
              <TextField
                fullWidth
                size="small"
                variant="outlined"
                placeholder={formatMessage({ id: "search.placeholder" })}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon style={{ color: 'white' }} />
                    </InputAdornment>
                  ),
                  style: { color: 'white' }
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'white',
                    },
                    '&:hover fieldset': {
                      borderColor: 'white',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'white',
                    },
                  },
                }}
              />
            </div>
            <div className="col-span-2">
              <NavbarLanguageSelector />
            </div>
            <div className="col-span-2">
              {loggedIn ? (
                <Link to={AppRoute.Profile}>
                  <IconButton>
                    <Avatar sx={{ bgcolor: '#8D0909' }}>
                      <PersonIcon />
                    </Avatar>
                  </IconButton>
                </Link>
              ) : (
                <AuthButtons />
              )}
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </div>
    <div className="w-full top-0 z-49">
      <div className="min-h-20"/>
    </div>
  </>
}