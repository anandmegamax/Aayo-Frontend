import React from "react";
import { Route } from "react-router-dom";
import Dashboard from "../admin/Dashboard";
import ProtectedRoute from "../auth/ProtectedRoute";
import Login from "../auth/Login";
import Profile from "../user/Profile";
import UpdateProfile from "../user/UpdateProfile";
import UploadAvatar from "../user/UploadAvatar";
import UpdatePassword from "../user/UpdatePassword";
import UserList from "../admin/UserList";
import RolePermissionManager from "../admin/RolePermissionManager";
import RoleList from "../admin/RoleList";
import FlightList from "../admin/FlightList";
import FlightTypeList from "../admin/FlightTypeList";
import AirportList from "../admin/AirportList";
import BookingList from "../admin/BookingList";
import AddBookingForm from "../admin/AddBookingForm";
import BookingView from "../admin/BookingView";
import LeadList from "../admin/LeadList";
import FacilityList from "../admin/FacilityList";
import FlightCategoryList from "../admin/FlightCategoryList";

const adminRoutes = () => {
  return (
    <>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Login />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/me/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/me/update_profile"
        element={
          <ProtectedRoute>
            <UpdateProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/me/upload_avatar"
        element={
          <ProtectedRoute>
            <UploadAvatar />
          </ProtectedRoute>
        }
      />
      <Route
        path="/me/update_password"
        element={
          <ProtectedRoute>
            <UpdatePassword />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/users"
        element={
          <ProtectedRoute>
            <UserList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/permissions"
        element={
          <ProtectedRoute>
            <RolePermissionManager />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/roles"
        element={
          <ProtectedRoute>
            <RoleList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/flights"
        element={
          <ProtectedRoute>
            <FlightList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/flight-types"
        element={
          <ProtectedRoute>
            <FlightTypeList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/airports"
        element={
          <ProtectedRoute>
            <AirportList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/bookings"
        element={
          <ProtectedRoute>
            <BookingList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/bookings/add"
        element={
          <ProtectedRoute>
            <AddBookingForm />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/bookings/:id"
        element={
          <ProtectedRoute>
            <BookingView />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/leads"
        element={
          <ProtectedRoute>
            <LeadList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/facilities"
        element={
          <ProtectedRoute>
            <FacilityList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/flight-categories"
        element={
          <ProtectedRoute>
            <FlightCategoryList />
          </ProtectedRoute>
        }
      />
    </>
  );
};

export default adminRoutes;
