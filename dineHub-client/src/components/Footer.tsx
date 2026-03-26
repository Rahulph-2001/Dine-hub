import { Link } from "react-router-dom";
import { Box, Container, Typography, Grid } from "@mui/material";
import { Restaurant as RestaurantIcon } from "@mui/icons-material";
import { APP_ROUTES } from "../config/routes";

const Footer = () => {
  return (
    <Box sx={{ bgcolor: "#F8FAFC", borderTop: "1px solid #F1F5F9", py: 4, mt: "auto" }}>
      <Container maxWidth="lg">
        <Grid container spacing={2} sx={{ justifyContent: "space-between", alignItems: "center" }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box component={Link} to={APP_ROUTES.HOME} sx={{ display: "flex", alignItems: "center", gap: 1, textDecoration: "none" }}>
              <RestaurantIcon sx={{ color: "primary.main", fontSize: 24 }} />
              <Typography variant="h6" sx={{ fontWeight: 800, color: "text.primary" }}>
                DineHub
              </Typography>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ display: "flex", gap: 3, justifyContent: { xs: "flex-start", md: "flex-end" } }}>
              <Typography component={Link} to={APP_ROUTES.HOME} variant="body2" sx={{ color: "text.secondary", "&:hover": { color: "primary.main" } }}>
                Home
              </Typography>
              <Typography component={Link} to={APP_ROUTES.RESTAURANTS} variant="body2" sx={{ color: "text.secondary", "&:hover": { color: "primary.main" } }}>
                Explore
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Typography variant="body2" color="text.secondary" sx={{ textAlign: "center", mt: 3, pt: 3, borderTop: "1px solid #E2E8F0" }}>
          © 2026 DineHub. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
