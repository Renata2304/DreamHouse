import { useCallback } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom';
import { AppRoute } from 'routes';
import { useIntl } from 'react-intl';
import { useAppSelector } from '@application/store';
import { IconButton } from '@mui/material';
import { useOwnUserHasRole } from '@infrastructure/hooks/useOwnUser';
import { UserRoleEnum } from '@infrastructure/apis/client';
import { NavbarLanguageSelector } from '@presentation/components/ui/NavbarLanguageSelector/NavbarLanguageSelector';
import { AuthButtons } from '@presentation/components/ui/AuthButtons/AuthButtons';
/**
 * This is the navigation menu that will stay at the top of the page.
 */
export const Navbar = () => {
  const { formatMessage } = useIntl();
  const isAdmin = useOwnUserHasRole(UserRoleEnum.Admin);

  return <>
    <div className="w-full top-0 z-50 fixed">
      <AppBar color="primary" position="static">
        <Toolbar>
          <div className="grid grid-cols-12 gap-y-5 gap-x-10 justify-center items-center">
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
                  <Link style={{ color: 'white' }} to={AppRoute.Users}>
                    {formatMessage({ id: "globals.users" })}
                  </Link>
                </Button>
              </div>
              <div className="col-span-1">
                <Button color="inherit">
                  <Link style={{ color: 'white' }} to={AppRoute.UserFiles}>
                    {formatMessage({ id: "globals.files" })}
                  </Link>
                </Button>
              </div>
            </>}
            <div className="col-span-8 flex justify-end items-center space-x-4">
              <AuthButtons />
              <NavbarLanguageSelector />
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