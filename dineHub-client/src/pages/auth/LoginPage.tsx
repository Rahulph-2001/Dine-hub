import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Box, Card, CardContent, Typography, TextField, Button, CircularProgress,
  InputAdornment, IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff, Email, Lock, Login as LoginIcon } from "@mui/icons-material";
import { useAuth } from "../../hooks/useAuth";
import { authService } from "../../api/services/auth.service";
import { APP_ROUTES } from "../../config/routes";
import { UI_MESSAGES } from "../../config/messages";
import type { LoginFormData } from "../../types";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState<LoginFormData>({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await authService.login(formData);
      login(data.data.user);
      toast.success(UI_MESSAGES.AUTH.LOGIN_SUCCESS);
      navigate(APP_ROUTES.RESTAURANTS);
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data?.message || UI_MESSAGES.ERROR.GENERIC);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "75vh" }}>
      <Card
        sx={{
          width: "100%", maxWidth: 440, p: 1,
          border: "1px solid #F1F5F9",
          boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Box sx={{ width: 56, height: 56, borderRadius: "50%", bgcolor: "#FFF7ED", mx: "auto", mb: 2, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <LoginIcon sx={{ fontSize: 28, color: "primary.main" }} />
            </Box>
            <Typography variant="h4" fontWeight={800} sx={{ mb: 0.5 }}>
              Welcome Back
            </Typography>
            <Typography color="text.secondary">
              Sign in to your DineHub account
            </Typography>
          </Box>

          <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
            <TextField
              name="email" label="Email" type="email"
              value={formData.email} onChange={handleChange} required fullWidth autoComplete="email"
              InputProps={{
                startAdornment: <InputAdornment position="start"><Email sx={{ color: "text.secondary" }} /></InputAdornment>,
              }}
            />
            <TextField
              name="password" label="Password" type={showPassword ? "text" : "password"}
              value={formData.password} onChange={handleChange} required fullWidth autoComplete="current-password"
              InputProps={{
                startAdornment: <InputAdornment position="start"><Lock sx={{ color: "text.secondary" }} /></InputAdornment>,
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" sx={{ color: "text.secondary" }}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit" variant="contained" size="large" fullWidth disabled={loading}
              sx={{
                mt: 1, py: 1.5, bgcolor: "primary.main", color: "#fff",
                "&:hover": { bgcolor: "primary.dark" }, fontSize: "1rem",
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "Sign In"}
            </Button>
          </Box>

          <Box sx={{ textAlign: "center", mt: 3 }}>
            <Typography color="text.secondary" variant="body2">
              Don't have an account?{" "}
              <Typography component={Link} to={APP_ROUTES.SIGNUP}
                sx={{ color: "primary.main", fontWeight: 600, "&:hover": { textDecoration: "underline" } }}
              >
                Sign Up
              </Typography>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default LoginPage;
