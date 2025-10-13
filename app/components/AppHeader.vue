<script setup lang="ts">
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
        <BasicButton as="link" to="/#about" variant="secondary"
          >About</BasicButton
        >
        <BasicButton variant="primary" @click="onLogin">Login</BasicButton>
      </div>
    </nav>
  </header>
</template>
