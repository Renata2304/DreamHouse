import { WebsiteLayout } from "presentation/layouts/WebsiteLayout";
import { Fragment, memo } from "react";
import { Box, Button, Stack } from "@mui/material";
import { Seo } from "@presentation/components/ui/Seo";
import { RegisterForm } from "../components/forms/Register/RegisterForm";
import { useNavigate } from "react-router-dom";
import { AppRoute } from "routes";

export const RegisterPage = memo(() => {
    const navigate = useNavigate();

    return (
        <Fragment>
            <Seo title="MobyLab Web App | Register" />
            <WebsiteLayout>
                <Box sx={{ padding: "0px 50px", justifyItems: "center" }}>
                    <RegisterForm />
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
