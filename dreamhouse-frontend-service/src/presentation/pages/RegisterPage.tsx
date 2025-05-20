import { WebsiteLayout } from "presentation/layouts/WebsiteLayout";
import { Fragment, memo } from "react";
import { Box, Button, Stack } from "@mui/material";
import { Seo } from "@presentation/components/ui/Seo";
import { useNavigate } from "react-router-dom";
import { AppRoute } from "routes";

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
async function generateCodeChallenge(codeVerifier: string) {
    const encoder = new TextEncoder();
    const data = encoder.encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
    const base64Url = btoa(String.fromCharCode(...new Uint8Array(digest)))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');
    return base64Url;
}

export const RegisterPage = memo(() => {
    const navigate = useNavigate();

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
            + `&code_challenge_method=S256`;

        window.location.href = registerUrl;
    };

    return (
        <Fragment>
            <Seo title="MobyLab Web App | Register" />
            <WebsiteLayout>
                <Box sx={{
                    padding: "0px 50px",
                    textAlign: "center",
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    minHeight: '60vh',
                    justifyContent: 'center'
                }}>
                    <Button
                        variant="contained"
                        onClick={redirectToKeycloakRegister}
                        size="large"
                        sx={{ minWidth: '200px', mb: 2 }}
                        fullWidth
                    >
                        Înregistrează-te cu Keycloak
                    </Button>
                    <Stack direction="row" justifyContent="center" mt={2}>
                        <Button variant="text" onClick={() => navigate(AppRoute.Login)}>
                            Ai deja cont? Autentifică-te
                        </Button>
                    </Stack>
                </Box>
            </WebsiteLayout>
        </Fragment>
    );
});
