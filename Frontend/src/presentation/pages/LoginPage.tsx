import { WebsiteLayout } from "presentation/layouts/WebsiteLayout";
import { Fragment, memo } from "react";
import { Box, Button, Stack } from "@mui/material";
import { Seo } from "@presentation/components/ui/Seo";
import { LoginForm } from "../components/forms/Login/LoginForm";
import { useNavigate } from "react-router-dom";
import { AppRoute } from "routes";

export const LoginPage = memo(() => {
    const navigate = useNavigate();

    return (
        <Fragment>
            <Seo title="MobyLab Web App | Login" />
            <WebsiteLayout>
                <Box sx={{ padding: "0px 50px", justifyItems: "center" }}>
                    <LoginForm />
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
