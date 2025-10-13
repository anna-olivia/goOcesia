import type { Ref } from "vue";
import { useCookie } from "#app";

interface User {
  id: number;
  name: string;
  email: string;
}

export const useAuthModel = () => {
  const user: Ref<User | null> = useState<User | null>("auth_user", () => null);
  const isAuthenticated = computed(() => user.value !== null);

  const login = async (email: string, password: string): Promise<void> => {
    try {
      const data = await $fetch<User>("/api/login", {
        method: "POST",
        body: { email, password },
      });
      user.value = data;
      // Demo Cookie Session
      const session = useCookie("session");
      session.value = JSON.stringify({
        id: data.id,
        email: data.email,
      });
    } catch (err: unknown) {
      if (err) {
        const errorData = err as { data?: { message?: string } };
        console.error("login failed", errorData.data?.message || err);
      } else {
        console.error("login failed", err);
      }
      throw err;
    }
  };

  return {
    user,
    isAuthenticated,
    login,
  };
};
