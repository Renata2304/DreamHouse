import { WebsiteLayout } from "presentation/layouts/WebsiteLayout";
import { Fragment, memo } from "react";
import { useIntl } from "react-intl";
import { Seo } from "@presentation/components/ui/Seo";
import { Box, Typography } from "@mui/material";

export const HomePage = memo(() => {
  const { formatMessage } = useIntl();

  return (
    <Fragment>
      <Seo title="DreamHouse | Home" />
      <WebsiteLayout>
        <Box className="px-[50px] py-12 flex flex-col items-center justify-center space-y-6">
          <img 
            src="/logo.png" 
            alt="DreamHouse Logo" 
            className="w-48 h-48 object-contain"
          />
          <Typography variant="h3" component="h1" className="text-center">
            Hello, Welcome to DreamHouse
          </Typography>
          <Typography variant="h6" color="text.secondary" className="text-center">
            Your perfect home is just a search away
          </Typography>
        </Box>
      </WebsiteLayout>
    </Fragment>
  );
});
