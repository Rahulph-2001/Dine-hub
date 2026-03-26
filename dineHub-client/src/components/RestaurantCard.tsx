import { useNavigate } from "react-router-dom";
import {
  Card, CardContent, CardMedia, Typography, Box, IconButton, Chip, Tooltip,
} from "@mui/material";
import {
  LocationOn, Phone, Email as EmailIcon, Edit, Delete, Star,
} from "@mui/icons-material";
import type { Restaurant } from "../types";
import { useAuth } from "../hooks/useAuth";

interface RestaurantCardProps {
  restaurant: Restaurant;
  onDelete: (id: string) => void;
}

const RestaurantCard = ({ restaurant, onDelete }: RestaurantCardProps) => {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "all 0.3s ease",
        cursor: "pointer",
        border: "1px solid #F1F5F9",
        borderRadius: 3,
        overflow: "hidden",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 12px 40px rgba(0,0,0,0.08)",
        },
      }}
      onClick={() => navigate(`/restaurants/${restaurant.id}`)}
    >
      <CardMedia
        component="img"
        height="200"
        image={restaurant.imageUrl || `https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop`}
        alt={restaurant.name}
        sx={{ objectFit: "cover" }}
      />
      <CardContent sx={{ flex: 1, display: "flex", flexDirection: "column", p: 2.5 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1 }}>
          <Box>
            <Typography variant="h6" fontWeight={700} sx={{ lineHeight: 1.3, mb: 0.3 }}>
              {restaurant.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.8rem" }}>
              Restaurant
            </Typography>
          </Box>
          {isAdmin && (
            <Box sx={{ display: "flex", gap: 0.5 }}>
              <Tooltip title="Edit">
                <IconButton
                  size="small"
                  onClick={(e) => { e.stopPropagation(); navigate(`/restaurants/${restaurant.id}/edit`); }}
                  sx={{ color: "primary.main", "&:hover": { bgcolor: "#FFF7ED" } }}
                >
                  <Edit fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete">
                <IconButton
                  size="small"
                  onClick={(e) => { e.stopPropagation(); onDelete(restaurant.id); }}
                  sx={{ color: "#EF4444", "&:hover": { bgcolor: "#FEF2F2" } }}
                >
                  <Delete fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
          )}
        </Box>

        <Box sx={{ flex: 1 }} />

        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <Star sx={{ fontSize: 16, color: "#F97316" }} />
            <Typography variant="body2" fontWeight={600}>4.0</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <LocationOn sx={{ fontSize: 16, color: "text.secondary" }} />
            <Typography variant="body2" color="text.secondary" noWrap sx={{ maxWidth: 160 }}>
              {restaurant.address}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default RestaurantCard;
