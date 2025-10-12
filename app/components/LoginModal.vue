<script setup lang="ts">
/* import { useRouter } from "vue-router"; // <== wichtig! */

/* const { login, isAuthenticated } = useAuthModel(); */
/* const router = useRouter();

const email = ref("");
const password = ref(""); */

/* async function handleLogin() {
  try {
    await login(email.value, password.value);
    router.push("/map");
  } catch (err) {
    alert("Login failed");
    return err;
  }
} */

// Wenn der Benutzer schon eingeloggt ist → direkt weiterleiten
/* watch(isAuthenticated, (loggedIn) => {
  if (loggedIn) router.push("/map");
}); */

const emit = defineEmits<{ (e: "close"): void }>();
</script>
<template>
  <!-- Overlay -->
  <div
    class="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50"
  >
    <div class="bg-white rounded shadow-lg w-full max-w-md p-4 relative">
      <button
        class="absolute right-4 top-2 hover:text-zinc-700 text-3xl"
        @click="emit('close')"
      >
        x
      </button>
      <div class="font-inter flex justify-evenly m-5 grid gap-6">
        <h2 class="text-3xl font-medium tracking-tight">Login</h2>
        <form class="flex flex-col gap-2 w-64">
          <!-- @submit.prevent="handleLogin" -->
          <input placeholder="E-Mail" class="border p-2 rounded" >
          <!-- v-model="email" -->
          <input
            type="password"
            placeholder="Passwort"
            class="border p-2 rounded"
          ><!-- v-model="password" -->
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
