import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Loader } from "@/shared/ui/Loader";
import { useAuthStore } from "@/store/auth";
import { AppRoutes } from "@/shared/config/routes";
import { ProtectedRoute } from "@/shared/ui/ProtectedRoute";

import {
  MePage,
  MainPage,
  LoginPage,
  RegisterPage,
  VaultPage,
  KanbanPage,
  KanbanBoardPage,
} from "@/pages/index";

export const RoutesPage = () => {
  const { isLoading, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Routes>
      {/* Публичные роуты */}
      <Route path={AppRoutes.ROOT} element={<MainPage />} />
      <Route path={AppRoutes.LOGIN} element={<LoginPage />} />
      <Route path={AppRoutes.REGISTER} element={<RegisterPage />} />
      <Route path={AppRoutes.REGISTER} element={<RegisterPage />} />

      {/* Приватные роуты */}
      <Route
        path={AppRoutes.ME}
        element={
          <ProtectedRoute>
            <MePage />
          </ProtectedRoute>
        }
      />

      <Route
        path={AppRoutes.VAULT}
        element={
          <ProtectedRoute>
            <VaultPage />
          </ProtectedRoute>
        }
      />

      <Route
        path={AppRoutes.KANBAN}
        element={
          <ProtectedRoute>
            <KanbanPage />
          </ProtectedRoute>
        }
      />

      <Route
        path={`${AppRoutes.KANBAN}/:boardId`}
        element={
          <ProtectedRoute>
            <KanbanBoardPage />
          </ProtectedRoute>
        }
      />

      {/* 404 */}
      <Route
        path={AppRoutes.NOT_FOUND}
        element={<div>404 | Page Not Found</div>}
      />
    </Routes>
  );
};
