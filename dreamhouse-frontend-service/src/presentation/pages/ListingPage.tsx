import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  TablePagination,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { WebsiteLayout } from "presentation/layouts/WebsiteLayout";
import { Seo } from "@presentation/components/ui/Seo";
import SearchIcon from "@mui/icons-material/Search";

export const ListingsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [listings, setListings] = useState<any[]>(location.state?.listings || []);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredListings = listings.filter((listing) =>
    Object.values(listing).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const paginatedListings = filteredListings.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <>
      <Seo title="Lista Proprietăților" />
      <WebsiteLayout>
        <Box className="px-[50px] py-6">
          <Typography variant="h4" gutterBottom>
            Lista Proprietăților
          </Typography>

          <Box className="mb-4">
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Caută după titlu, locație, preț..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          {listings.length === 0 ? (
            <Typography color="text.secondary">Nicio proprietate găsită.</Typography>
          ) : (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Titlu</TableCell>
                    <TableCell>Locație</TableCell>
                    <TableCell>Preț (€)</TableCell>
                    <TableCell>Tip Proprietate</TableCell>
                    <TableCell>Acțiuni</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedListings.map((listing: any, index: number) => (
                    <TableRow key={index}>
                      <TableCell>{listing.title || "Titlu indisponibil"}</TableCell>
                      <TableCell>{listing.location || "Nespecificat"}</TableCell>
                      <TableCell>{listing.price ?? "Nespecificat"}</TableCell>
                      <TableCell>{listing.propertyType || "Nespecificat"}</TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          size="small"
                          onClick={() => navigate(`/listings/${listing.id}`)}
                        >
                          Detalii
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <TablePagination
                rowsPerPageOptions={[5, 10, 15]}
                component="div"
                count={filteredListings.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage="Rezultate per pagină:"
              />
            </TableContainer>
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
