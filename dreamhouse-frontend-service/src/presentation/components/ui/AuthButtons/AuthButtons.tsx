import { memo } from 'react';
import { useIntl } from 'react-intl';
import { Button } from '@mui/material';
import { AppRoute } from 'routes/index';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '@application/store';

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

const logout = async () => {
    const token = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refreshToken');

    try {
        // End the Keycloak session
        await fetch('http://localhost:1100/realms/dreamhouse/protocol/openid-connect/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                client_id: 'dreamhouse-client',
                refresh_token: refreshToken || '',
            }),
        });

        // Clear all storage
        localStorage.clear();
        sessionStorage.clear();

        // Redirect to login page
        window.location.href = '/login';
    } catch (error) {
        console.error('Error during logout:', error);
        // Even if the Keycloak logout fails, we still want to clear all storage
        localStorage.clear();
        sessionStorage.clear();
        window.location.href = '/login';
    }
};

export const AuthButtons = memo(() => {
    const { formatMessage } = useIntl();
    const navigate = useNavigate();
    const { loggedIn } = useAppSelector(x => x.profileReducer);

    const handleLogout = async () => {
        await logout();
    };

    if (loggedIn) {
        return (
            <Button
                color="inherit"
                onClick={handleLogout}
                sx={{
                    color: 'white',
                    '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.1)'
                    }
                }}
            >
                {formatMessage({ id: "globals.logout" })}
            </Button>
        );
    }

    return (
        <>
            <Button
                color="inherit"
                onClick={() => navigate(AppRoute.Login)}
                sx={{
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
                onClick={() => navigate(AppRoute.Register)}
                sx={{
                    color: 'white',
                    '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.1)'
                    }
                }}
            >
                {formatMessage({ id: "globals.register" })}
            </Button>
        </>
    );
});