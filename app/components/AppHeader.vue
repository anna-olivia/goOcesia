<script setup lang="ts">
import { computed } from "vue";

type Variant = "primary" | "secondary" | "ghost";

const props = withDefaults(
  defineProps<{
    variant?: Variant;
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
  }>(),
  {
    variant: "primary",
    disabled: false,
    type: "button", // wichtig gegen unbeabsichtigtes Submit
  }
);

const classes = computed(() => {
  const base =
    "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
  const variants: Record<Variant, string> = {
    primary:
      "bg-green-700 text-white hover:bg-green-800 focus-visible:ring-blue-600",
    secondary:
      "bg-gray-100 text-gray-900 hover:bg-gray-200 focus-visible:ring-gray-400",
    ghost:
      "bg-transparent text-gray-900 hover:bg-gray-100 focus-visible:ring-gray-400",
  };
  return `${base} ${variants[props.variant]}`;
});
const { open, setReturnTo } = useLoginModal();
const route = useRoute();
const onLogin = () => {
  setReturnTo(route.fullPath);
  open();
};
</script>
<template>
  <header
    class="border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60"
  >
    <nav class="container mx-auto flex items-center justify-between px-4 py-3">
      <NuxtLink
        to="/"
        class="inline-block transition-transform hover:scale-105 will-change-transform"
      >
        <NuxtImg src="/logo.png" alt="logo" width="80" height="80" />
      </NuxtLink>
      <div class="flex items-center gap-3">
        <NuxtLink to="/#about" class="nav-link">
          <button variant="secondary">About</button>
        </NuxtLink>
        <button
          :class="classes"
          :disabled="disabled"
          :type="type"
          @click="onLogin"
        >
          Login
        </button>
      </div>
    </nav>
  </header>
</template>
