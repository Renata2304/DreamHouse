import { WebsiteLayout } from "presentation/layouts/WebsiteLayout";
import { Fragment, memo, useState } from "react";
import { useIntl } from "react-intl";
import { Seo } from "@presentation/components/ui/Seo";
import {
  TextField,
  Button,
  Box,
  CircularProgress,
} from "@mui/material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const HomePage = memo(() => {
  const { formatMessage } = useIntl();
  const navigate = useNavigate(); // 🔥

  const [location, setLocation] = useState("");
  const [jsonResponse, setJsonResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchListings = async () => {
    if (!location.trim()) return;

    setLoading(true);
    setError(null);
    setJsonResponse(null);

    try {
      const url = `/listings/listing/getByLocation?location=${encodeURIComponent(location)}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      setJsonResponse(data);

      // 🔥 Navighează spre ListingsPage cu rezultate
      navigate("/listings", { state: { listings: data } });

    } catch (err: any) {
      console.error("Eroare fetch:", err);
      setError("Nu s-a putut prelua lista de proprietăți. Verifică conexiunea și încearcă din nou.");
      toast.error(formatMessage({ id: "notifications.errors.networkError" }));
    } finally {
      setLoading(false);
    }
  };


  return (
    <Fragment>
      <Seo title="MobyLab Web App | Home" />
      <WebsiteLayout>
        <Box className="px-[50px] space-y-4">
          <TextField
            fullWidth
            variant="outlined"
            label="Caută după locație"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <Button variant="contained" onClick={fetchListings}>
            Caută
          </Button>

          {loading && (
            <Box className="flex justify-center">
              <CircularProgress />
            </Box>
          )}

          {error && <Box color="error.main">{error}</Box>}

          {!loading && jsonResponse && (
            <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-[400px]">
              {JSON.stringify(jsonResponse, null, 2)}
            </pre>
          )}
        </Box>
      </WebsiteLayout>
    </Fragment>
  );
});
