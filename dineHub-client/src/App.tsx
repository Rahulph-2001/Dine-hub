import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { Toaster } from "react-hot-toast";
import theme from "./theme/theme";
import { AuthProvider } from "./context/AuthContext";
import { APP_ROUTES } from "./config/routes";
import MainLayout from "./layouts/MainLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import LandingPage from "./pages/LandingPage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import RestaurantListPage from "./pages/restaurant/RestaurantListPage";
import RestaurantDetailPage from "./pages/restaurant/RestaurantDetailPage";
import RestaurantFormPage from "./pages/restaurant/RestaurantFormPage";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Toaster
        position="top-right"
        toastOptions={{
          style: { background: "#fff", color: "#1E293B", border: "1px solid #F1F5F9", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" },
          success: { iconTheme: { primary: "#F97316", secondary: "#fff" } },
          error: { iconTheme: { primary: "#EF4444", secondary: "#fff" } },
        }}
      />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path={APP_ROUTES.HOME} element={<LandingPage />} />
              <Route path={APP_ROUTES.LOGIN} element={<LoginPage />} />
              <Route path={APP_ROUTES.SIGNUP} element={<SignupPage />} />
              <Route path={APP_ROUTES.PROFILE} element={
                <ProtectedRoute><ProfilePage /></ProtectedRoute>
              } />
              <Route path={APP_ROUTES.RESTAURANTS} element={<RestaurantListPage />} />
              <Route path={APP_ROUTES.RESTAURANT_DETAIL} element={<RestaurantDetailPage />} />
              <Route path={APP_ROUTES.RESTAURANT_CREATE} element={
                <ProtectedRoute><RestaurantFormPage /></ProtectedRoute>
              } />
              <Route path={APP_ROUTES.RESTAURANT_EDIT} element={
                <ProtectedRoute><RestaurantFormPage /></ProtectedRoute>
              } />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
