<script setup lang="ts">
const { show, close } = useLoginModal();
</script>
<template>
  <CookieControl locale="de" />
  <LoginModal v-if="show" @close="close" />
  <NuxtLayout>
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </NuxtLayout>
</template>
