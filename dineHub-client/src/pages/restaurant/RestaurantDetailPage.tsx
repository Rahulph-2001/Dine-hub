import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box, Typography, Card, CardMedia, CircularProgress, Button, Chip, Divider,
} from "@mui/material";
import {
  LocationOn, Phone, Email as EmailIcon, ArrowBack, Edit, Delete,
} from "@mui/icons-material";
import { restaurantService } from "../../api/services/restaurant.service";
import { APP_ROUTES } from "../../config/routes";
import { UI_MESSAGES } from "../../config/messages";
import type { Restaurant } from "../../types";
import { useAuth } from "../../hooks/useAuth";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";

const RestaurantDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await restaurantService.getById(id!);
        setRestaurant(data.data);
      } catch (error) {
        const err = error as AxiosError<{ message: string }>;
        toast.error(err.response?.data?.message || UI_MESSAGES.ERROR.GENERIC);
        navigate(APP_ROUTES.RESTAURANTS);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id, navigate]);

  const handleDelete = async () => {
    if (!window.confirm(UI_MESSAGES.RESTAURANT.DELETE_CONFIRM)) return;
    try {
      await restaurantService.delete(id!);
      toast.success(UI_MESSAGES.RESTAURANT.DELETED);
      navigate(APP_ROUTES.RESTAURANTS);
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data?.message || UI_MESSAGES.ERROR.GENERIC);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (!restaurant) return null;

  return (
    <Box>
      <Button startIcon={<ArrowBack />} onClick={() => navigate(APP_ROUTES.RESTAURANTS)}
        sx={{ mb: 3, color: "text.secondary", "&:hover": { color: "text.primary" } }}
      >
        Back to Restaurants
      </Button>

      <Card sx={{ overflow: "hidden", border: "1px solid #F1F5F9", boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}>
        <CardMedia
          component="img" height="350"
          image={restaurant.imageUrl || `https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=400&fit=crop`}
          alt={restaurant.name} sx={{ objectFit: "cover" }}
        />
        <Box sx={{ p: { xs: 3, md: 4 } }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 2, mb: 3 }}>
            <Box>
              <Typography variant="h3" fontWeight={800}>{restaurant.name}</Typography>
              <Chip label="Restaurant" size="small" sx={{ mt: 1, bgcolor: "#FFF7ED", color: "primary.main" }} />
            </Box>
            {isAdmin && (
              <Box sx={{ display: "flex", gap: 1.5 }}>
                <Button variant="outlined" startIcon={<Edit />}
                  onClick={() => navigate(`/restaurants/${restaurant.id}/edit`)}
                  sx={{ borderColor: "primary.main", color: "primary.main" }}
                >
                  Edit
                </Button>
                <Button variant="outlined" startIcon={<Delete />} onClick={handleDelete}
                  sx={{ borderColor: "#EF4444", color: "#EF4444" }}
                >
                  Delete
                </Button>
              </Box>
            )}
          </Box>

          <Divider sx={{ my: 3 }} />

          {restaurant.description && (
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>About</Typography>
              <Typography color="text.secondary" sx={{ lineHeight: 1.8 }}>{restaurant.description}</Typography>
            </Box>
          )}

          <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>Contact Information</Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Box sx={{ p: 1, borderRadius: 2, bgcolor: "#FFF7ED" }}>
                <LocationOn sx={{ color: "primary.main" }} />
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">Address</Typography>
                <Typography fontWeight={500}>{restaurant.address}</Typography>
              </Box>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Box sx={{ p: 1, borderRadius: 2, bgcolor: "#FFF7ED" }}>
                <Phone sx={{ color: "primary.main" }} />
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">Phone</Typography>
                <Typography fontWeight={500}>{restaurant.phone}</Typography>
              </Box>
            </Box>
            {restaurant.email && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Box sx={{ p: 1, borderRadius: 2, bgcolor: "#FFF7ED" }}>
                  <EmailIcon sx={{ color: "primary.main" }} />
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">Email</Typography>
                  <Typography fontWeight={500}>{restaurant.email}</Typography>
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

export default RestaurantDetailPage;
