import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import CreatorLanding from "../pages/public/CreatorLanding";

import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import CreatorDashboard from "../pages/creator/CreatorDashboard";
import AdvertiserDashboard from "../pages/advertiser/AdvertiserDashboard";
import ProtectedRoute from "./ProtectedRoute";
import Profile from "../pages/creator/Profile";
import MediaKit from "../pages/creator/MediaKit";
import Bookings from "../pages/bookings/Bookings";
import DiscoverCreators from "../pages/advertiser/DiscoverCreators";
import PublicMediaKit from "../pages/PublicMediaKit";

import MyRoster from "../pages/advertiser/MyRoster";

function HomeRedirect() {
  const { user, loading } = useAuth();

  if (loading) {
    return <p>Loading...</p>;
  }

  return user
    ? <Navigate to="/creator/dashboard" replace />
    : <Navigate to="/login" replace />;
}

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeRedirect />} />

<Route
  path="/creator/profile"
  element={
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  }
/>

<Route
  path="/creator/media-kit"
  element={
    <ProtectedRoute>
      <MediaKit />
    </ProtectedRoute>
  }
/>

<Route
  path="/bookings"
  element={
    <ProtectedRoute>
      <Bookings />
    </ProtectedRoute>
  }
/>

<Route
  path="/creators"
  element={<CreatorLanding />}
/>

        <Route path="/login" element={<Login />} />

<Route
  path="/signup"
  element={<Signup />}
/>

        <Route
  path="/creator/dashboard"
  element={
    <ProtectedRoute>
      <CreatorDashboard />
    </ProtectedRoute>
  }
/>

        <Route
  path="/advertiser/discover"
  element={
    <ProtectedRoute>
      <DiscoverCreators />
    </ProtectedRoute>
  }
/><Route
  path="/creator/:ref"
  element={
    <ProtectedRoute>
      <PublicMediaKit />
    </ProtectedRoute>
  }
/>
<Route
  path="/advertiser/roster"
  element={
    <ProtectedRoute>
      <MyRoster />
    </ProtectedRoute>
  }
/>
      </Routes>
    </BrowserRouter>
  );
}