import { Outlet, useLocation } from "react-router-dom";
import { Box, Container } from "@mui/material";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = () => {
  const location = useLocation();
  const isLanding = location.pathname === "/";

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />
      {isLanding ? (
        <Outlet />
      ) : (
        <Container maxWidth="lg" sx={{ flex: 1, py: 4 }}>
          <Outlet />
        </Container>
      )}
      <Footer />
    </Box>
  );
};

export default MainLayout;
