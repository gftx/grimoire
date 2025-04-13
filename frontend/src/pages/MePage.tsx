import { useEffect, useState } from "react";
import { getMe, User } from "@/features/auth/api/me";
import { useUserStore } from "@/entities/user/model/useUserStore";

export default function MePage() {
  const { user, setUser } = useUserStore();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    async function loadUser() {
      try {
        const userData: User = await getMe();
        setUser(userData);
      } catch (err) {
        console.error("Ошибка загрузки профиля:", err);
        setError("Ошибка загрузки профиля");
      } finally {
        setLoading(false);
      }
    }
    loadUser();
  }, [setUser]);

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;
  if (!user) return <div>Пользователь не найден</div>;

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Профиль пользователя</h2>
      <p>
        <strong>ID:</strong> {user.id}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      {user.role && (
        <p>
          <strong>Role:</strong> {user.role}
        </p>
      )}
    </div>
  );
}
