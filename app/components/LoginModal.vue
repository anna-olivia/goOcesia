<script setup lang="ts">
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useCookie } from "#app";

const emit = defineEmits<{ (e: "close"): void }>();

const router = useRouter();
const { login, isAuthenticated } = useAuthModel();

const email = ref("");
const password = ref("");

const showLoginModal = useState("showLoginModal", () => false);

const session = useCookie("session", {
  maxAge: 60 * 60 * 24,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
});

const handleLogin = async (): Promise<void> => {
  try {
    await login(email.value, password.value);
    // demo session
    session.value = JSON.stringify({
      email: email.value,
      time: Date.now(),
    });

    showLoginModal.value = false;
    emit("close");
    router.push("/map");
  } catch (err) {
    console.error("Login failed", err);
    alert("Login failed. Check your entries");
  }
};

watchEffect(() => {
  if (isAuthenticated.value || session.value) {
    showLoginModal.value = false;
    emit("close");
  }
});

//Wenn der Benutzer schon eingeloggt ist → automatisch weiterleiten
watch(isAuthenticated, (loggedIn) => {
  if (loggedIn) {
    router.push("/map");
  }
});
</script>
<template>
  <!-- Overlay -->
  <div
    v-if="showLoginModal"
    class="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50"
  >
    <div class="bg-white rounded shadow-lg w-full max-w-md p-4 relative">
      <button
        class="absolute right-4 top-2 hover:text-zinc-700 text-3xl"
        @click="
          showLoginModal = false;
          emit('close');
        "
      >
        x
      </button>
      <div class="font-inter flex justify-evenly m-5 grid gap-6">
        <h2 class="text-3xl font-medium tracking-tight">Login</h2>

        <form class="flex flex-col gap-2 w-64" @submit.prevent="handleLogin">
          <input
            v-model="email"
            placeholder="E-Mail"
            class="border p-2 rounded"
            required
          />

          <input
            v-model="password"
            type="password"
            placeholder="Passwort"
            class="border p-2 rounded"
            required
          />
          <button
            type="submit"
            class="bg-green-700 text-white p-2 rounded hover:bg-green-800"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
