import { useNavigate } from "react-router-dom";
import { Box, Typography, Button, Container, Grid } from "@mui/material";
import { Search, Star, Settings, ArrowForward } from "@mui/icons-material";
import { APP_ROUTES } from "../config/routes";
import { useAuth } from "../hooks/useAuth";

const LandingPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const features = [
    {
      icon: <Search sx={{ fontSize: 28, color: "#fff" }} />,
      title: "Smart Discovery",
      description: "Find restaurants by cuisine, location, rating, or mood. Our intelligent search helps you discover your next favorite spot.",
      color: "#F97316",
    },
    {
      icon: <Star sx={{ fontSize: 28, color: "#fff" }} />,
      title: "Trusted Reviews",
      description: "Read authentic reviews from real diners. Make informed decisions based on genuine experiences.",
      color: "#F97316",
    },
    {
      icon: <Settings sx={{ fontSize: 28, color: "#fff" }} />,
      title: "Easy Management",
      description: "Restaurant owners can easily add, update, and showcase their establishments to thousands of food lovers.",
      color: "#F97316",
    },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          position: "relative",
          minHeight: "85vh",
          display: "flex",
          alignItems: "center",
          backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.2)), url("https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600&q=80")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ maxWidth: 600, py: 8 }}>
            <Box
              sx={{
                display: "inline-block", mb: 3, px: 2, py: 0.5,
                border: "1px solid rgba(255,255,255,0.3)", borderRadius: "20px",
              }}
            >
              <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.8)", letterSpacing: 1, fontWeight: 500 }}>
                #1 Restaurant Discovery Platform
              </Typography>
            </Box>
            <Typography variant="h2" sx={{ color: "#fff", fontWeight: 800, lineHeight: 1.1, mb: 1 }}>
              Find Your Next
            </Typography>
            <Typography
              variant="h2"
              sx={{
                fontFamily: "'Playfair Display', serif",
                fontStyle: "italic", fontWeight: 700,
                color: "#F97316", lineHeight: 1.1, mb: 3,
              }}
            >
              Culinary Adventure
            </Typography>
            <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.8)", mb: 4, maxWidth: 480, lineHeight: 1.8 }}>
              Discover exceptional restaurants, read trusted reviews, and book your perfect dining experience—all in one place.
            </Typography>
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
              <Button
                variant="contained"
                size="large"
                startIcon={<Search />}
                onClick={() => navigate(APP_ROUTES.RESTAURANTS)}
                sx={{
                  bgcolor: "#F97316", color: "#fff", px: 4, py: 1.5,
                  "&:hover": { bgcolor: "#EA580C" },
                }}
              >
                Explore Restaurants
              </Button>
              {!isAuthenticated && (
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => navigate(APP_ROUTES.SIGNUP)}
                  sx={{
                    borderColor: "rgba(255,255,255,0.5)", color: "#fff", px: 4, py: 1.5,
                    "&:hover": { borderColor: "#fff", bgcolor: "rgba(255,255,255,0.1)" },
                  }}
                >
                  Create Free Account
                </Button>
              )}
            </Box>

            {/* Stats */}
            <Box sx={{ display: "flex", gap: 5, mt: 5 }}>
              {[
                { value: "500+", label: "Restaurants" },
                { value: "50K+", label: "Happy Diners" },
                { value: "4.8", label: "Avg Rating" },
              ].map((stat) => (
                <Box key={stat.label}>
                  <Typography variant="h5" sx={{ color: "#fff", fontWeight: 700 }}>{stat.value}</Typography>
                  <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.6)" }}>{stat.label}</Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography variant="h4" fontWeight={700} sx={{ mb: 1 }}>
            Why Choose DineHub?
          </Typography>
          <Typography color="text.secondary">
            Everything you need to discover, manage, and enjoy great dining experiences.
          </Typography>
        </Box>
        <Grid container spacing={4}>
          {features.map((feature) => (
            <Grid size={{ xs: 12, md: 4 }} key={feature.title}>
              <Box
                sx={{
                  p: 4, borderRadius: 3, textAlign: "center",
                  border: "1px solid #F1F5F9",
                  transition: "all 0.3s ease",
                  "&:hover": { boxShadow: "0 8px 30px rgba(0,0,0,0.06)", transform: "translateY(-4px)" },
                }}
              >
                <Box
                  sx={{
                    width: 56, height: 56, borderRadius: "50%", mx: "auto", mb: 2.5,
                    bgcolor: feature.color, display: "flex", alignItems: "center", justifyContent: "center",
                  }}
                >
                  {feature.icon}
                </Box>
                <Typography variant="h6" fontWeight={600} sx={{ mb: 1.5 }}>{feature.title}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                  {feature.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box sx={{ bgcolor: "#F97316", py: 8 }}>
        <Container maxWidth="sm" sx={{ textAlign: "center" }}>
          <Typography variant="h4" sx={{ color: "#fff", fontWeight: 700, mb: 2 }}>
            Own a Restaurant?
          </Typography>
          <Typography sx={{ color: "rgba(255,255,255,0.85)", mb: 4 }}>
            Join thousands of restaurant owners who trust DineHub to connect with hungry diners. List your restaurant for free.
          </Typography>
          <Button
            variant="contained"
            size="large"
            endIcon={<ArrowForward />}
            onClick={() => navigate(isAuthenticated ? APP_ROUTES.RESTAURANT_CREATE : APP_ROUTES.SIGNUP)}
            sx={{
              bgcolor: "#1E293B", color: "#fff", px: 4, py: 1.5,
              "&:hover": { bgcolor: "#0F172A" },
            }}
          >
            Add Your Restaurant
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;
