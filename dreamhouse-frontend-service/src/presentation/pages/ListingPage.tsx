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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { WebsiteLayout } from "presentation/layouts/WebsiteLayout";
import { Seo } from "@presentation/components/ui/Seo";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import { useIntl } from "react-intl";
import { ListingControllerApi } from "../../api/listings/apis/ListingControllerApi";
import { Configuration } from "../../api/listings/runtime";

export const ListingsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { formatMessage } = useIntl();
  const [listings, setListings] = useState<any[]>(location.state?.listings || []);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedListingId, setSelectedListingId] = useState<string | null>(null);
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDeleteClick = (listingId: string) => {
    setSelectedListingId(listingId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedListingId || !token) return;

    try {
      const config = new Configuration({
        accessToken: () => Promise.resolve(token)
      });
      const api = new ListingControllerApi(config);
      await api.deleteListing({ id: selectedListingId });
      
      // Remove the deleted listing from the state
      setListings(listings.filter(listing => listing.id !== selectedListingId));
      setDeleteDialogOpen(false);
      setSelectedListingId(null);
    } catch (error) {
      console.error('Error deleting listing:', error);
      // You might want to show an error message to the user here
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setSelectedListingId(null);
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
      <Seo title={formatMessage({ id: "search.listings.title" })} />
      <WebsiteLayout>
        <Box className="px-[50px] py-6">
          <Typography variant="h4" gutterBottom>
            {formatMessage({ id: "search.listings.title" })}
          </Typography>

          <Box className="mb-4">
            <TextField
              fullWidth
              variant="outlined"
              placeholder={formatMessage({ id: "search.listings.placeholder" })}
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
                        <Box className="flex gap-2">
                          <Button
                            variant="contained"
                            size="small"
                            onClick={() => navigate(`/listings/${listing.id}`)}
                          >
                            Detalii
                          </Button>
                          {userId && listing.userId === userId && (
                            <IconButton
                              color="error"
                              size="small"
                              onClick={() => handleDeleteClick(listing.id)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          )}
                        </Box>
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

          <Dialog
            open={deleteDialogOpen}
            onClose={handleDeleteCancel}
          >
            <DialogTitle>Confirmare ștergere</DialogTitle>
            <DialogContent>
              <Typography>
                Sunteți sigur că doriți să ștergeți această proprietate?
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDeleteCancel}>Anulează</Button>
              <Button onClick={handleDeleteConfirm} color="error" variant="contained">
                Șterge
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </WebsiteLayout>
    </>
  );
};
