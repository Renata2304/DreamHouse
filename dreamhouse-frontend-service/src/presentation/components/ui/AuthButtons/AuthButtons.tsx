import { Button, Stack } from '@mui/material';
import { useIntl } from 'react-intl';
import { useAppSelector } from '@application/store';
import { useAppDispatch } from '@application/store';
import { resetProfile } from '@application/state-slices';
import { useAppRouter } from '@infrastructure/hooks/useAppRouter';
import Keycloak from 'keycloak-js';

// Initialize Keycloak
const keycloak = new (Keycloak as any)({
    url: "http://localhost:1100",
    realm: "dreamhouse",
    clientId: "backend-rest-api",
});

// Function to generate random string for PKCE
const generateRandomString = (length: number) => {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

// Function to generate code challenge from verifier
const generateCodeChallenge = async (codeVerifier: string) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode(...new Uint8Array(digest)))
        .replace(/=/g, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_');
};

export const AuthButtons = () => {
    const { formatMessage } = useIntl();
    const { loggedIn } = useAppSelector(x => x.profileReducer);
    const dispatch = useAppDispatch();
    const { redirectToHome } = useAppRouter();

    const redirectToKeycloakLogin = async () => {
        const keycloakUrl = 'http://localhost:1100';
        const realm = 'dreamhouse';
        const clientId = 'backend-rest-api';
        const redirectUri = encodeURIComponent('http://localhost:3001/');

        // Generate PKCE values
        const codeVerifier = generateRandomString(128);
        const codeChallenge = await generateCodeChallenge(codeVerifier);

        // Store code verifier in session storage to use it later
        sessionStorage.setItem('code_verifier', codeVerifier);

        const loginUrl = `${keycloakUrl}/realms/${realm}/protocol/openid-connect/auth`
            + `?client_id=${clientId}`
            + `&redirect_uri=${redirectUri}`
            + `&response_type=code`
            + `&scope=openid`
            + `&code_challenge=${codeChallenge}`
            + `&code_challenge_method=S256`;
        window.location.href = loginUrl;
    };

    const redirectToKeycloakRegister = async () => {
        const keycloakUrl = 'http://localhost:1100';
        const realm = 'dreamhouse';
        const clientId = 'backend-rest-api';
        const redirectUri = encodeURIComponent('http://localhost:3001/');

        // Generate PKCE values
        const codeVerifier = generateRandomString(128);
        const codeChallenge = await generateCodeChallenge(codeVerifier);

        // Store code verifier in session storage to use it later
        sessionStorage.setItem('code_verifier', codeVerifier);

        const registerUrl = `${keycloakUrl}/realms/${realm}/protocol/openid-connect/registrations`
            + `?client_id=${clientId}`
            + `&redirect_uri=${redirectUri}`
            + `&response_type=code`
            + `&scope=openid profile email`
            + `&code_challenge=${codeChallenge}`
            + `&code_challenge_method=S256`
            + `&kc_action=register`;

        window.location.href = registerUrl;
    };

    const handleLogout = () => {
       
        localStorage.clear();
        sessionStorage.clear();
        
        dispatch(resetProfile());
        
        if (keycloak && keycloak.token) {
            keycloak.logout({ redirectUri: window.location.origin });
          } else {
            window.location.href = '/'; // fallback
          }          
    };

    if (loggedIn) {
        return (
            <Button color="inherit" onClick={handleLogout}>
                {formatMessage({ id: "globals.logout" })}
            </Button>
        );
    }

    return (
        <Stack direction="row" spacing={2}>
            <Button
                color="inherit"
                onClick={redirectToKeycloakLogin}
                sx={{
                    minWidth: '100px',
                    color: 'white',
                    '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.1)'
                    }
                }}
            >
                {formatMessage({ id: "globals.login" })}
            </Button>
            <Button
                color="inherit"
                onClick={redirectToKeycloakRegister}
                sx={{
                    minWidth: '100px',
                    color: 'white',
                    '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.1)'
                    }
                }}
            >
                {formatMessage({ id: "globals.register" })}
            </Button>
        </Stack>
    );
};
