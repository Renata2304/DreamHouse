import { useLocation, useNavigate } from "react-router-dom";
import { Box, Card, CardContent, Typography, Button } from "@mui/material";
import { WebsiteLayout } from "presentation/layouts/WebsiteLayout";
import { Seo } from "@presentation/components/ui/Seo";

export const ListingsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const listings = location.state?.listings || [];

  return (
    <>
      <Seo title="Rezultate Căutare" />
      <WebsiteLayout>
        <Box className="px-[50px] py-6">
          <Typography variant="h4" gutterBottom>
            Rezultatele pentru locație
          </Typography>

          {listings.length === 0 ? (
            <Typography color="text.secondary">Nicio proprietate găsită.</Typography>
          ) : (
            <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              {listings.map((listing: any, index: number) => (
                <Card key={index} className="shadow-md">
                  <CardContent>
                    <Typography variant="h6">{listing.title || "Titlu indisponibil"}</Typography>
                    <Typography variant="body2">Locație: {listing.location}</Typography>
                    <Typography variant="body2">Preț: {listing.price ?? "Nespecificat"} €</Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
          )}

          <Box className="mt-6">
            <Button variant="outlined" onClick={() => navigate(-1)}>
              Înapoi
            </Button>
          </Box>
        </Box>
      </WebsiteLayout>
    </>
  );
};
