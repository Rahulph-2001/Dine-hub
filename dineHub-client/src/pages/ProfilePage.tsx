import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box, Typography, Tabs, Tab, Avatar, Card, CardContent,
  CardMedia, CircularProgress, Button, IconButton, Tooltip, Grid,
  Dialog, DialogTitle, DialogContent, DialogActions, Chip, Divider,
  TextField, InputAdornment, Pagination,
} from "@mui/material";
import {
  Person, Restaurant as RestaurantIcon, Edit, Delete, Add as AddIcon,
  ArrowForward, Email as EmailIcon, Badge, CalendarMonth, LocationOn, Search,
} from "@mui/icons-material";
import { useAuth } from "../hooks/useAuth";
import axiosInstance from "../api/axiosInstance";
import { API_ENDPOINTS, APP_ROUTES } from "../config/routes";
import { UI_MESSAGES } from "../config/messages";
import type { Restaurant } from "../types";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [tab, setTab] = useState(0);

  // Restaurant state
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  // Pagination & Search state
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 6;

  // Delete state
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 500);
    return () => clearTimeout(handler);
  }, [search]);

  // Fetch paginated & searched data
  const fetchMyRestaurants = async () => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.get(API_ENDPOINTS.RESTAURANT.MY, {
        params: { page, limit, search: debouncedSearch },
      });
      setRestaurants(data.data.data);
      setTotal(data.data.total);
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data?.message || UI_MESSAGES.ERROR.GENERIC);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyRestaurants();
  }, [page, debouncedSearch]);

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      await axiosInstance.delete(API_ENDPOINTS.RESTAURANT.BY_ID(deleteId));
      toast.success(UI_MESSAGES.RESTAURANT.DELETED);
      fetchMyRestaurants();
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
      {/* Hero Banner */}
      <Box
        sx={{
          position: "relative", py: 8, mt: -4, mx: -3,
          backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.3)), url("https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&q=80")`,
          backgroundSize: "cover", backgroundPosition: "center",
          px: { xs: 3, md: 6 },
        }}
      >
        <Box sx={{ display: "inline-flex", alignItems: "center", gap: 1, mb: 2, px: 2, py: 0.5, bgcolor: "rgba(255,255,255,0.15)", borderRadius: "20px" }}>
          <Person sx={{ color: "#fff", fontSize: 16 }} />
          <Typography variant="caption" sx={{ color: "#fff", fontWeight: 500 }}>Your account</Typography>
        </Box>
        <Typography variant="h3" sx={{ color: "#fff", fontWeight: 800, mb: 1 }}>Profile</Typography>
        <Typography sx={{ color: "rgba(255,255,255,0.8)" }}>Manage your account and restaurants</Typography>
      </Box>

      {/* Tabs Card */}
      <Card sx={{ mx: "auto", maxWidth: 800, mt: -3, position: "relative", zIndex: 1, border: "1px solid #F1F5F9", boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}>
        <Tabs
          value={tab}
          onChange={(_, v) => setTab(v)}
          variant="fullWidth"
          sx={{
            "& .MuiTab-root": { fontWeight: 600, py: 2 },
            "& .Mui-selected": { color: "#fff !important" },
            "& .MuiTabs-indicator": { display: "none" },
          }}
        >
          <Tab icon={<Person />} iconPosition="start" label="Account"
            sx={{ bgcolor: tab === 0 ? "primary.main" : "transparent", color: tab === 0 ? "#fff" : "text.primary", borderRadius: "12px 0 0 0", transition: "all 0.3s" }}
          />
          <Tab icon={<RestaurantIcon />} iconPosition="start" label="Restaurants"
            sx={{ bgcolor: tab === 1 ? "primary.main" : "transparent", color: tab === 1 ? "#fff" : "text.primary", borderRadius: "0 12px 0 0", transition: "all 0.3s" }}
          />
        </Tabs>

        <CardContent sx={{ p: { xs: 3, md: 4 }, minHeight: 400 }}>
          {tab === 0 && user && (
            <Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 3, mb: 4 }}>
                <Avatar sx={{ width: 80, height: 80, bgcolor: "primary.main", fontSize: "2rem", fontWeight: 700 }}>
                  {user.name.charAt(0).toUpperCase()}
                </Avatar>
                <Box>
                  <Typography variant="h5" fontWeight={700}>{user.name}</Typography>
                  <Chip label={user.role} size="small" color="primary" variant="outlined" sx={{ mt: 0.5 }} />
                </Box>
              </Box>
              <Divider sx={{ mb: 3 }} />
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Box sx={{ p: 1, borderRadius: 2, bgcolor: "#FFF7ED" }}>
                    <EmailIcon sx={{ color: "primary.main" }} />
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">Email</Typography>
                    <Typography fontWeight={500}>{user.email}</Typography>
                  </Box>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Box sx={{ p: 1, borderRadius: 2, bgcolor: "#FFF7ED" }}>
                    <Badge sx={{ color: "primary.main" }} />
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">Role</Typography>
                    <Typography fontWeight={500}>{user.role}</Typography>
                  </Box>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Box sx={{ p: 1, borderRadius: 2, bgcolor: "#FFF7ED" }}>
                    <CalendarMonth sx={{ color: "primary.main" }} />
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">Member Since</Typography>
                    <Typography fontWeight={500}>{new Date(user.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          )}

          {tab === 1 && (
            <Box>
              {/* Search + Add Header */}
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2, flexWrap: "wrap", gap: 2 }}>
                <Typography variant="h6" fontWeight={600}>
                  {total} Restaurant{total !== 1 ? "s" : ""}
                </Typography>
                <Button variant="contained" size="small" startIcon={<AddIcon />} onClick={() => navigate(APP_ROUTES.RESTAURANT_CREATE)}
                  sx={{ bgcolor: "primary.main", "&:hover": { bgcolor: "primary.dark" } }}
                >
                  Add New
                </Button>
              </Box>

              {/* Search Input */}
              <TextField
                placeholder="Search your restaurants..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                fullWidth
                size="small"
                sx={{ mb: 3 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start"><Search sx={{ color: "text.secondary" }} /></InputAdornment>
                  ),
                }}
              />

              {loading ? (
                <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
                  <CircularProgress color="primary" />
                </Box>
              ) : restaurants.length === 0 ? (
                <Box sx={{ textAlign: "center", py: 6 }}>
                  <Box sx={{ width: 72, height: 72, borderRadius: "50%", bgcolor: "#FFF7ED", mx: "auto", mb: 2, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <RestaurantIcon sx={{ fontSize: 36, color: "primary.main" }} />
                  </Box>
                  <Typography variant="h6" fontWeight={700} sx={{ mb: 1 }}>
                    {debouncedSearch ? "No restaurants match your search" : "No restaurants yet"}
                  </Typography>
                  <Typography color="text.secondary" sx={{ mb: 3, maxWidth: 320, mx: "auto" }}>
                    {debouncedSearch ? "Try a different search term." : "Your restaurant list will appear here. Add your first spot or explore what others have shared."}
                  </Typography>
                  {!debouncedSearch && (
                    <Box sx={{ display: "flex", justifyContent: "center", gap: 2, flexWrap: "wrap" }}>
                      <Button variant="contained" startIcon={<AddIcon />} onClick={() => navigate(APP_ROUTES.RESTAURANT_CREATE)}
                        sx={{ bgcolor: "primary.main", "&:hover": { bgcolor: "primary.dark" } }}
                      >
                        Add restaurant
                      </Button>
                      <Button variant="outlined" endIcon={<ArrowForward />} onClick={() => navigate(APP_ROUTES.RESTAURANTS)}
                        sx={{ borderColor: "primary.main", color: "primary.main" }}
                      >
                        Explore restaurants
                      </Button>
                    </Box>
                  )}
                </Box>
              ) : (
                <>
                  <Grid container spacing={2}>
                    {restaurants.map((r) => (
                      <Grid size={{ xs: 12, sm: 6 }} key={r.id}>
                        <Card sx={{ display: "flex", border: "1px solid #F1F5F9", cursor: "pointer", transition: "all 0.3s", "&:hover": { boxShadow: "0 4px 16px rgba(0,0,0,0.06)" } }}
                          onClick={() => navigate(`/restaurants/${r.id}`)}
                        >
                          <CardMedia
                            component="img" sx={{ width: 120, objectFit: "cover" }}
                            image={r.imageUrl || "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=200&h=150&fit=crop"}
                            alt={r.name}
                          />
                          <CardContent sx={{ flex: 1, p: 2, "&:last-child": { pb: 2 } }}>
                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                              <Box>
                                <Typography fontWeight={700} sx={{ fontSize: "0.95rem" }}>{r.name}</Typography>
                                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mt: 0.5 }}>
                                  <LocationOn sx={{ fontSize: 14, color: "text.secondary" }} />
                                  <Typography variant="caption" color="text.secondary" noWrap sx={{ maxWidth: 150 }}>{r.address}</Typography>
                                </Box>
                              </Box>
                              <Box sx={{ display: "flex", gap: 0.5 }} onClick={(e) => e.stopPropagation()}>
                                <Tooltip title="Edit">
                                  <IconButton size="small" onClick={() => navigate(`/restaurants/${r.id}/edit`)}
                                    sx={{ color: "primary.main", "&:hover": { bgcolor: "#FFF7ED" } }}
                                  >
                                    <Edit fontSize="small" />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title="Delete">
                                  <IconButton size="small" onClick={() => setDeleteId(r.id)}
                                    sx={{ color: "#EF4444", "&:hover": { bgcolor: "#FEF2F2" } }}
                                  >
                                    <Delete fontSize="small" />
                                  </IconButton>
                                </Tooltip>
                              </Box>
                            </Box>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>

                  {totalPages > 1 && (
                    <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
                      <Pagination
                        count={totalPages}
                        page={page}
                        onChange={(_, value) => setPage(value)}
                        color="primary"
                        size="medium"
                      />
                    </Box>
                  )}
                </>
              )}
            </Box>
          )}
        </CardContent>
      </Card>

      <Dialog open={!!deleteId} onClose={() => setDeleteId(null)} PaperProps={{ sx: { border: "1px solid #F1F5F9" } }}>
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

export default ProfilePage;
