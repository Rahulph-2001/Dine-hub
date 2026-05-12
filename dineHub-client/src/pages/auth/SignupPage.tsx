import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Box, Card, CardContent, Typography, TextField, Button, CircularProgress,
  InputAdornment, IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff, Email, Lock, Person, PersonAdd } from "@mui/icons-material";
import { useAuth } from "../../hooks/useAuth";
import { authService } from "../../api/services/auth.service";
import { APP_ROUTES } from "../../config/routes";
import { UI_MESSAGES } from "../../config/messages";
import type { SignupFormData } from "../../types";
import toast from "react-hot-toast";
import axios from "axios";

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const SignupPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState<SignupFormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear the error for the field being edited
    if (formErrors[name as keyof FormErrors]) {
      setFormErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const errors: FormErrors = {};

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errors.name = "Name must be at least 2 characters";
    }

    if (!formData.email.trim() || !EMAIL_REGEX.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!formData.password || formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      errors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
      const data = await authService.signup(formData);
      login(data.data.user);
      toast.success(UI_MESSAGES.AUTH.SIGNUP_SUCCESS);
      navigate(APP_ROUTES.RESTAURANTS);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || UI_MESSAGES.ERROR.GENERIC;
        toast.error(errorMessage);
      } else {
        toast.error(UI_MESSAGES.ERROR.GENERIC);
      }
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
              <PersonAdd sx={{ fontSize: 28, color: "primary.main" }} />
            </Box>
            <Typography variant="h4" fontWeight={800} sx={{ mb: 0.5 }}>
              Create Account
            </Typography>
            <Typography color="text.secondary">
              Join DineHub to explore restaurants
            </Typography>
          </Box>

          <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
            <TextField
              name="name"
              label="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              fullWidth
              error={!!formErrors.name}
              helperText={formErrors.name}
              InputProps={{
                startAdornment: <InputAdornment position="start"><Person sx={{ color: "text.secondary" }} /></InputAdornment>,
              }}
            />
            <TextField
              name="email"
              label="Email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              fullWidth
              autoComplete="email"
              error={!!formErrors.email}
              helperText={formErrors.email}
              InputProps={{
                startAdornment: <InputAdornment position="start"><Email sx={{ color: "text.secondary" }} /></InputAdornment>,
              }}
            />
            <TextField
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              required
              fullWidth
              autoComplete="new-password"
              error={!!formErrors.password}
              helperText={formErrors.password || "Minimum 6 characters"}
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
            <TextField
              name="confirmPassword"
              label="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              fullWidth
              autoComplete="new-password"
              error={!!formErrors.confirmPassword}
              helperText={formErrors.confirmPassword}
              InputProps={{
                startAdornment: <InputAdornment position="start"><Lock sx={{ color: "text.secondary" }} /></InputAdornment>,
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end" sx={{ color: "text.secondary" }}>
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              disabled={loading}
              sx={{
                mt: 1, py: 1.5, bgcolor: "primary.main", color: "#fff",
                "&:hover": { bgcolor: "primary.dark" }, fontSize: "1rem",
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "Create Account"}
            </Button>
          </Box>

          <Box sx={{ textAlign: "center", mt: 3 }}>
            <Typography color="text.secondary" variant="body2">
              Already have an account?{" "}
              <Typography component={Link} to={APP_ROUTES.LOGIN}
                sx={{ color: "primary.main", fontWeight: 600, "&:hover": { textDecoration: "underline" } }}
              >
                Sign In
              </Typography>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SignupPage;
