import { FC, PropsWithChildren, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AppRoute } from '../../routes';

export const AuthHandler: FC<PropsWithChildren> = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const handleAuthCallback = async () => {
            const params = new URLSearchParams(location.search);
            const code = params.get('code');
            const codeVerifier = sessionStorage.getItem('code_verifier');

            // If we have an authorization code, process it
            if (code && codeVerifier) {
                try {
                    const response = await fetch('http://localhost:1100/realms/dreamhouse/protocol/openid-connect/token', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                        body: new URLSearchParams({
                            grant_type: 'authorization_code',
                            client_id: 'backend-rest-api',
                            code_verifier: codeVerifier,
                            code: code,
                            redirect_uri: 'http://localhost:3001/'
                        })
                    });

                    if (!response.ok) {
                        throw new Error('Token exchange failed');
                    }

                    const tokens = await response.json();

                    // Store the tokens
                    localStorage.setItem('token', tokens.access_token);
                    localStorage.setItem('refresh_token', tokens.refresh_token);

                    // Clean up session storage
                    sessionStorage.removeItem('code_verifier');

                    // Remove the authorization code from the URL
                    const cleanUrl = window.location.origin + '/';
                    window.history.replaceState({}, document.title, cleanUrl);
                } catch (error) {
                    console.error('Authentication error:', error);
                    navigate(AppRoute.Login);
                }
            }
        };

        handleAuthCallback();
    }, [location, navigate]);

    return <>{children}</>;
};