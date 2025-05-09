

import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import Layout from "../layout/Layout";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import InformationList from "../pages/informations/InformationList";
import InformationCreate from "../pages/informations/InformationCreate";
import InformationEdit from "../pages/informations/InformationEdit";
import ActivityList from "../pages/activities/ActivityList";
import ActivityCreate from "../pages/activities/ActivityCreate";
import ActivityEdit from "../pages/activities/ActivityEdit";
import ActivityTypeList from "../pages/activity-types/ActivityTypeList";
import ActivityTypeCreate from "../pages/activity-types/ActivityTypeCreate";
import ActivityTypeEdit from "../pages/activity-types/ActivityTypeEdit";
import MenuList from "../pages/menu/MenuList";
import MenuCreate from "../pages/menu/MenuCreate";
import MenuEdit from "../pages/menu/MenuEdit";
import UserList from "../pages/users/UserList";
import UserCreate from "../pages/users/UserCreate";
import UserEdit from "../pages/users/UserEdit";
import RoleList from "../pages/roles/RoleList";
import RoleCreate from "../pages/roles/RoleCreate";
import RoleEdit from "../pages/roles/RoleEdit";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<ProtectedRoute minRole={60} />}>
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/informations" element={<InformationList />} />
          <Route path="/informations/create" element={<InformationCreate />} />
          <Route path="/informations/edit/:id" element={<InformationEdit />} />
          <Route path="/activities" element={<ActivityList />} />
          <Route path="/activities/create" element={<ActivityCreate />} />
            <Route path="/activities/edit/:id" element={<ActivityEdit />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute minRole={80} />}>
        <Route element={<Layout />}>
          <Route path="/users" element={<UserList />} />
          <Route path="/users/create" element={<UserCreate />} />
          <Route path="/users/edit/:id" element={<UserEdit />} />
          <Route path="/menus" element={<MenuList />} />
          <Route path="/menus/create" element={<MenuCreate />} />
          <Route path="/menus/edit/:id" element={<MenuEdit />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute minRole={100} />}>
        <Route element={<Layout />}>
          <Route path="/activity-types" element={<ActivityTypeList />} />
          <Route path="/activity-types/create" element={<ActivityTypeCreate />} />
          <Route path="/activity-types/edit/:id" element={<ActivityTypeEdit />} />
          <Route path="/roles" element={<RoleList />} />
          <Route path="/roles/create" element={<RoleCreate />} />
          <Route path="/roles/edit/:id" element={<RoleEdit />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}