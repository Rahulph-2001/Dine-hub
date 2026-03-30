import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box, Typography, Card, CardContent, TextField, Button, CircularProgress,
  InputAdornment,
} from "@mui/material";
import {
  Restaurant as RestIcon, LocationOn, Phone, Email as EmailIcon,
  Description, ArrowBack, CloudUpload, Save,
} from "@mui/icons-material";
import { restaurantService } from "../../api/services/restaurant.service";
import { APP_ROUTES } from "../../config/routes";
import { UI_MESSAGES } from "../../config/messages";
import type { RestaurantFormData } from "../../types";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";

const RestaurantFormPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditing = !!id;
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEditing);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [formData, setFormData] = useState<RestaurantFormData>({
    name: "", address: "", phone: "", email: "", description: "", image: null,
  });

  useEffect(() => {
    if (isEditing) {
      const fetchRestaurant = async () => {
        try {
          const data = await restaurantService.getById(id!);
          const r = data.data;
          setFormData({
            name: r.name, address: r.address, phone: r.phone,
            email: r.email || "", description: r.description || "", image: null,
          });
          if (r.imageUrl) setImagePreview(r.imageUrl);
        } catch (error) {
          const err = error as AxiosError<{ message: string }>;
          toast.error(err.response?.data?.message || UI_MESSAGES.ERROR.GENERIC);
          navigate(APP_ROUTES.RESTAURANTS);
        } finally {
          setFetching(false);
        }
      };
      fetchRestaurant();
    }
  }, [id, isEditing, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, image: file }));
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = new FormData();
      payload.append("name", formData.name);
      payload.append("address", formData.address);
      payload.append("phone", formData.phone);
      if (formData.email) payload.append("email", formData.email);
      if (formData.description) payload.append("description", formData.description);
      if (formData.image) payload.append("image", formData.image);

      if (isEditing) {
        await restaurantService.update(id!, payload);
        toast.success(UI_MESSAGES.RESTAURANT.UPDATED);
      } else {
        await restaurantService.create(payload);
        toast.success(UI_MESSAGES.RESTAURANT.CREATED);
      }
      navigate(APP_ROUTES.RESTAURANTS);
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data?.message || UI_MESSAGES.ERROR.GENERIC);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

  return (
    <Box>
      <Button startIcon={<ArrowBack />} onClick={() => navigate(APP_ROUTES.RESTAURANTS)}
        sx={{ mb: 3, color: "text.secondary", "&:hover": { color: "text.primary" } }}
      >
        Back to Restaurants
      </Button>

      <Card sx={{ maxWidth: 700, mx: "auto", border: "1px solid #F1F5F9", boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}>
        <CardContent sx={{ p: { xs: 3, md: 4 } }}>
          <Typography variant="h4" fontWeight={800} sx={{ mb: 4 }}>
            {isEditing ? "Edit Restaurant" : "Add New Restaurant"}
          </Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <TextField name="name" label="Restaurant Name" value={formData.name} onChange={handleChange} required fullWidth
              InputProps={{ startAdornment: <InputAdornment position="start"><RestIcon sx={{ color: "text.secondary" }} /></InputAdornment> }}
            />
            <TextField name="address" label="Address" value={formData.address} onChange={handleChange} required fullWidth
              InputProps={{ startAdornment: <InputAdornment position="start"><LocationOn sx={{ color: "text.secondary" }} /></InputAdornment> }}
            />
            <TextField name="phone" label="Phone" value={formData.phone} onChange={handleChange} required fullWidth
              InputProps={{ startAdornment: <InputAdornment position="start"><Phone sx={{ color: "text.secondary" }} /></InputAdornment> }}
            />
            <TextField name="email" label="Email (optional)" value={formData.email} onChange={handleChange} fullWidth
              InputProps={{ startAdornment: <InputAdornment position="start"><EmailIcon sx={{ color: "text.secondary" }} /></InputAdornment> }}
            />
            <TextField name="description" label="Description (optional)" value={formData.description} onChange={handleChange}
              fullWidth multiline rows={3}
              InputProps={{ startAdornment: <InputAdornment position="start"><Description sx={{ color: "text.secondary" }} /></InputAdornment> }}
            />

            <Box>
              <Button variant="outlined" component="label" startIcon={<CloudUpload />}
                sx={{ borderColor: "#E2E8F0", color: "text.secondary", "&:hover": { borderColor: "primary.main", color: "primary.main" } }}
              >
                Upload Image
                <input type="file" hidden accept="image/*" onChange={handleImageChange} />
              </Button>
              {imagePreview && (
                <Box sx={{ mt: 2, borderRadius: 2, overflow: "hidden", maxHeight: 200 }}>
                  <img src={imagePreview} alt="Preview" style={{ width: "100%", height: 200, objectFit: "cover", borderRadius: 8 }} />
                </Box>
              )}
            </Box>

            <Button type="submit" variant="contained" size="large" disabled={loading} startIcon={<Save />}
              sx={{
                mt: 1, py: 1.5, bgcolor: "primary.main", color: "#fff",
                "&:hover": { bgcolor: "primary.dark" }, fontSize: "1rem",
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : isEditing ? "Update Restaurant" : "Create Restaurant"}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default RestaurantFormPage;
