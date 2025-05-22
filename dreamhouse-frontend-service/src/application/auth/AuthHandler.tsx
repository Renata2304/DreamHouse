import { FC, PropsWithChildren, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AppRoute } from '../../routes';
import { useAppDispatch } from '@application/store';
import { setToken } from '@application/state-slices';
import { useRef } from 'react';

export const AuthHandler: FC<PropsWithChildren> = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useAppDispatch();

    const alreadyCalled = useRef(false); // <-- Adăugat

    useEffect(() => {
        const handleAuthCallback = async () => {
            const params = new URLSearchParams(location.search);
            const code = params.get('code');
            const codeVerifier = sessionStorage.getItem('code_verifier');
            const redirectUri = window.location.origin + '/';

            console.log("code:", code);
            console.log("code_verifier:", codeVerifier);
            console.log("redirect_uri:", redirectUri);

            if (alreadyCalled.current) return; // <-- împiedică dublă execuție
            alreadyCalled.current = true;

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
                            redirect_uri: redirectUri,
                        }),
                    });

                    if (!response.ok) {
                        const errorJson = await response.json(); // NU face .json() de 2 ori
                        throw new Error(errorJson.error_description || 'Token exchange failed');
                    }

                    const tokens = await response.json();

                    dispatch(setToken(tokens.access_token));
                    localStorage.setItem('refresh_token', tokens.refresh_token);
                    sessionStorage.removeItem('code_verifier');

                    const cleanUrl = window.location.origin + '/';
                    window.history.replaceState({}, document.title, cleanUrl);
                } catch (error) {
                    console.error('Authentication error:', error);
                }
            }
        };

        handleAuthCallback();
    }, [location, navigate, dispatch]);

    return <>{children}</>;
};
