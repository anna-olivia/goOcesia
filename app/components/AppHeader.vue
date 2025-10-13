<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { useCookie } from "#app";
import type { Ref, ComputedRef } from "vue";
import { useLoginModal, useAuthModel } from "#imports";

const props = withDefaults(
  defineProps<{
    showLoginButton?: boolean;
  }>(),
  {
    showLoginButton: true,
  }
);

const { open, setReturnTo } = useLoginModal();
const { isAuthenticated } = useAuthModel();
const route = useRoute();
const router = useRouter();

const session: Ref<string | null> = useCookie("session");

const onLogin = () => {
  setReturnTo(route.fullPath);
  open();
};

const goToPage = () => {
  router.push("/map");
};

const isLoggedIn: ComputedRef<boolean> = computed(() => {
  return isAuthenticated.value || !!session.value;
});
const buttonText: ComputedRef<string> = computed(() =>
  isLoggedIn.value ? "See Map" : "Login"
);

const buttonAction = (): void => {
  if (isLoggedIn.value) goToPage();
  else onLogin();
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
        <BasicButton as="link" to="/#about" variant="secondary"
          >About</BasicButton
        >
        <BasicButton
          v-if="props.showLoginButton"
          variant="primary"
          @click="buttonAction"
        >
          {{ buttonText }}
        </BasicButton>
      </div>
    </nav>
  </header>
</template>
