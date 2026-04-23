import { useState, useEffect } from "react";
import {
  Box, Typography, Grid, CircularProgress, TextField, InputAdornment, Button,
  Dialog, DialogTitle, DialogContent, DialogActions, Pagination,
} from "@mui/material";
import { Search, Add as AddIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { restaurantService } from "../../api/services/restaurant.service";
import { APP_ROUTES } from "../../config/routes";
import { UI_MESSAGES } from "../../config/messages";
import type { Restaurant } from "../../types";
import { useAuth } from "../../hooks/useAuth";
import RestaurantCard from "../../components/RestaurantCard";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";

const RestaurantListPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  
  const [page, setPage] = useState(1);
  const limit = 9;

  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [ list,setList] = useState(false)
  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1); // Reset to page 1 on new search
    }, 500); // 500ms delay

    return () => clearTimeout(handler);
  }, [search]);

  // Fetch paginated & searched data
  const fetchRestaurants = async () => {
    setLoading(true);
    try {
      const data = await restaurantService.getAll({ page, limit, search: debouncedSearch });
      setRestaurants(data.data.data);
      setTotal(data.data.total);
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data?.message || UI_MESSAGES.ERROR.GENERIC);
    } finally {
      setLoading(false);
    }
  };

  function handleList(){
     setList((prev)=>!prev)
  }


  useEffect(() => {
    fetchRestaurants();
  }, [page, debouncedSearch]);

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      await restaurantService.delete(deleteId);
      setRestaurants((prev) => prev.filter((r) => r.id !== deleteId));
      fetchRestaurants(); // Refresh to keep pagination count accurate
      toast.success(UI_MESSAGES.RESTAURANT.DELETED);
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data?.message || UI_MESSAGES.ERROR.GENERIC);
    } finally {
      setDeleting(false);
      setDeleteId(null);
    }
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4, flexWrap: "wrap", gap: 2 }}>
        <Box>
          <Typography variant="overline" sx={{ color: "primary.main", fontWeight: 600, letterSpacing: 2 }}>
            HANDPICKED FOR YOU
          </Typography>
          <Typography variant="h4" fontWeight={700}>
            Explore Restaurants
          </Typography>
          <Typography color="text.secondary" sx={{ mt: 0.5 }}>
            {total} restaurants available
          </Typography>
          
        </Box>
        
        {isAuthenticated && (
          <div>
            <button onClick={()=>handleList()}>List</button>
            <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate(APP_ROUTES.RESTAURANT_CREATE)}
            sx={{
              bgcolor: "primary.main", color: "#fff",
              "&:hover": { bgcolor: "primary.dark" },
            }}
          >
            Add Restaurant
          </Button>
          </div>

          
        )}
      </Box>

      <TextField
        placeholder="Search restaurants by name or address..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        fullWidth
        sx={{ mb: 4 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start"><Search sx={{ color: "text.secondary" }} /></InputAdornment>
          ),
        }}
      />

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
          <CircularProgress color="primary" />
        </Box>
      ) : restaurants.length === 0 ? (
        <Box sx={{ textAlign: "center", py: 8 }}>
          <Typography variant="h6" color="text.secondary">
            {debouncedSearch ? "No restaurants found matching your search." : "No restaurants available."}
          </Typography>
        </Box>
      ) : (
        <>
          <Grid container spacing={3}>
            {
              list && (
                restaurants.map((restaurant) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={restaurant.id}>
                <RestaurantCard restaurant={restaurant} onDelete={(id) => setDeleteId(id)} />
              </Grid>
              )
            )
          )
            }
          </Grid>
          
          {totalPages > 0 && (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 6, mb: 4 }}>
              <Pagination 
                count={totalPages} 
                page={page} 
                onChange={(_, value) => setPage(value)} 
                color="primary" 
                size="large"
              />
            </Box>
          )}
        </>
      )}

      <Dialog open={!!deleteId} onClose={() => setDeleteId(null)}
        PaperProps={{ sx: { border: "1px solid #F1F5F9" } }}
      >
        <DialogTitle>Delete Restaurant</DialogTitle>
        <DialogContent>
          <Typography color="text.secondary">{UI_MESSAGES.RESTAURANT.DELETE_CONFIRM}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteId(null)} color="inherit">Cancel</Button>
          <Button onClick={handleDelete} color="error" variant="contained" disabled={deleting}>
            {deleting ? <CircularProgress size={20} color="inherit" /> : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default RestaurantListPage;
