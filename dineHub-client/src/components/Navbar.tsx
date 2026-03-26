import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import {
  AppBar, Toolbar, Typography, Button, IconButton, Box, Chip,
  useMediaQuery, useTheme, Drawer, List, ListItem, ListItemText,
  ListItemIcon, Container,
} from "@mui/material";
import {
  Restaurant as RestaurantIcon, Login as LoginIcon, PersonAdd as SignupIcon,
  Logout as LogoutIcon, Menu as MenuIcon, Explore as ExploreIcon,
  Home as HomeIcon, Add as AddIcon,
} from "@mui/icons-material";
import { useAuth } from "../hooks/useAuth";
import { APP_ROUTES } from "../config/routes";
import { UI_MESSAGES } from "../config/messages";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const isHome = location.pathname === "/";
  const isTransparent = isHome;

  const handleLogout = async () => {
    await logout();
    setDrawerOpen(false);
    toast.success(UI_MESSAGES.AUTH.LOGOUT_SUCCESS);
    navigate(APP_ROUTES.LOGIN);
  };

  const navLinkSx = {
    color: isTransparent ? "#fff" : "text.primary",
    fontWeight: 500,
    "&:hover": { color: "primary.main" },
  };

  const activeLinkSx = {
    ...navLinkSx,
    color: "primary.main",
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <AppBar
        position={isTransparent ? "absolute" : "sticky"}
        elevation={0}
        sx={{
          background: isTransparent ? "transparent" : "#FFFFFF",
          borderBottom: isTransparent ? "none" : "1px solid #F1F5F9",
          zIndex: 1100,
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
            <Box
              component={Link}
              to={APP_ROUTES.HOME}
              sx={{ display: "flex", alignItems: "center", gap: 1.5, textDecoration: "none" }}
            >
              <Box
                sx={{
                  width: 40, height: 40, borderRadius: "50%",
                  bgcolor: "primary.main", display: "flex", alignItems: "center", justifyContent: "center",
                }}
              >
                <RestaurantIcon sx={{ color: "#fff", fontSize: 22 }} />
              </Box>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 800, color: isTransparent ? "#fff" : "text.primary", lineHeight: 1.1 }}>
                  DineHub
                </Typography>
                <Typography variant="caption" sx={{ color: isTransparent ? "rgba(255,255,255,0.7)" : "text.secondary", fontSize: "0.65rem", letterSpacing: 1 }}>
                  RESTAURANT FINDER
                </Typography>
              </Box>
            </Box>

            {isMobile ? (
              <IconButton onClick={() => setDrawerOpen(true)} sx={{ color: isTransparent ? "#fff" : "text.primary" }}>
                <MenuIcon />
              </IconButton>
            ) : (
              <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                <Button onClick={() => navigate(APP_ROUTES.HOME)} sx={isActive("/") ? activeLinkSx : navLinkSx}>
                  Home
                </Button>
                <Button onClick={() => navigate(APP_ROUTES.RESTAURANTS)} sx={isActive("/restaurants") ? activeLinkSx : navLinkSx}>
                  Explore
                </Button>
                {isAuthenticated ? (
                  <>
                    <Button onClick={() => navigate(APP_ROUTES.RESTAURANT_CREATE)} sx={isActive("/restaurants/new") ? activeLinkSx : navLinkSx}>
                      Add Listing
                    </Button>
                    <Button onClick={() => navigate(APP_ROUTES.PROFILE)} sx={isActive("/profile") ? activeLinkSx : navLinkSx}>
                      {user?.name}
                    </Button>
                    <IconButton onClick={handleLogout} sx={{ color: isTransparent ? "#fff" : "text.secondary" }}>
                      <LogoutIcon />
                    </IconButton>
                  </>
                ) : (
                  <>
                    <Button onClick={() => navigate(APP_ROUTES.LOGIN)} sx={navLinkSx}>
                      Sign In
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => navigate(APP_ROUTES.SIGNUP)}
                      sx={{
                        bgcolor: "primary.main", color: "#fff",
                        borderRadius: "8px", px: 3,
                        "&:hover": { bgcolor: "primary.dark" },
                      }}
                    >
                      Get Started
                    </Button>
                  </>
                )}
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}
        PaperProps={{ sx: { width: 280 } }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, color: "primary.main", mb: 2 }}>Menu</Typography>
          {isAuthenticated && user && (
            <Box sx={{ mb: 2, p: 2, bgcolor: "#FFF7ED", borderRadius: 2 }}>
              <Typography variant="subtitle2" fontWeight={600}>{user.name}</Typography>
              <Typography variant="caption" color="text.secondary">{user.email}</Typography>
              <Chip label={user.role} size="small" color="primary" variant="outlined" sx={{ mt: 0.5, fontSize: "0.65rem", height: 20, display: "block", width: "fit-content" }} />
            </Box>
          )}
          <List>
            <ListItem onClick={() => { navigate(APP_ROUTES.HOME); setDrawerOpen(false); }}
              sx={{ borderRadius: 2, cursor: "pointer", "&:hover": { bgcolor: "#FFF7ED" } }}
            >
              <ListItemIcon><HomeIcon sx={{ color: "text.secondary" }} /></ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem onClick={() => { navigate(APP_ROUTES.RESTAURANTS); setDrawerOpen(false); }}
              sx={{ borderRadius: 2, cursor: "pointer", "&:hover": { bgcolor: "#FFF7ED" } }}
            >
              <ListItemIcon><ExploreIcon sx={{ color: "text.secondary" }} /></ListItemIcon>
              <ListItemText primary="Explore" />
            </ListItem>
            {isAuthenticated ? (
              <>
                <ListItem onClick={() => { navigate(APP_ROUTES.RESTAURANT_CREATE); setDrawerOpen(false); }}
                  sx={{ borderRadius: 2, cursor: "pointer", "&:hover": { bgcolor: "#FFF7ED" } }}
                >
                  <ListItemIcon><AddIcon sx={{ color: "primary.main" }} /></ListItemIcon>
                  <ListItemText primary="Add Listing" />
                </ListItem>
                <ListItem onClick={handleLogout}
                  sx={{ borderRadius: 2, cursor: "pointer", "&:hover": { bgcolor: "#FEF2F2" } }}
                >
                  <ListItemIcon><LogoutIcon sx={{ color: "#EF4444" }} /></ListItemIcon>
                  <ListItemText primary="Logout" sx={{ color: "#EF4444" }} />
                </ListItem>
              </>
            ) : (
              <>
                <ListItem onClick={() => { navigate(APP_ROUTES.LOGIN); setDrawerOpen(false); }}
                  sx={{ borderRadius: 2, cursor: "pointer", "&:hover": { bgcolor: "#FFF7ED" } }}
                >
                  <ListItemIcon><LoginIcon sx={{ color: "text.secondary" }} /></ListItemIcon>
                  <ListItemText primary="Sign In" />
                </ListItem>
                <ListItem onClick={() => { navigate(APP_ROUTES.SIGNUP); setDrawerOpen(false); }}
                  sx={{ borderRadius: 2, cursor: "pointer", "&:hover": { bgcolor: "#FFF7ED" } }}
                >
                  <ListItemIcon><SignupIcon sx={{ color: "primary.main" }} /></ListItemIcon>
                  <ListItemText primary="Get Started" />
                </ListItem>
              </>
            )}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
