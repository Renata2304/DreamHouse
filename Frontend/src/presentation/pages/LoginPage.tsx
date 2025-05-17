import { WebsiteLayout } from "presentation/layouts/WebsiteLayout";
import { Fragment, memo } from "react";
import { Box, Button, Stack } from "@mui/material";
import { Seo } from "@presentation/components/ui/Seo";
import { useNavigate } from "react-router-dom";
import { AppRoute } from "routes";

export const LoginPage = memo(() => {
    const navigate = useNavigate();

    const redirectToKeycloak = () => {
        const redirectUri = encodeURIComponent("http://localhost:3000");
        const clientId = "backend-rest-api";
        const realm = "dreamhouse";
        const responseType = "code";

        const authUrl = `http://localhost:1100/realms/${realm}/protocol/openid-connect/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=openid`;

        window.location.href = authUrl;
    };


    return (
        <Fragment>
            <Seo title="MobyLab Web App | Login" />
            <WebsiteLayout>
                <Box sx={{ padding: "0px 50px", textAlign: "center" }}>
                    <Button variant="contained" onClick={redirectToKeycloak}>
                        Autentifică-te cu Keycloak
                    </Button>

                    <Stack direction="row" justifyContent="center" mt={2}>
                        <Button variant="text" onClick={() => navigate(AppRoute.Register)}>
                            Nu ai cont? Înregistrează-te
                        </Button>
                    </Stack>
                </Box>
            </WebsiteLayout>
        </Fragment>
    );
});
