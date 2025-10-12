<script setup lang="ts">
if (import.meta.server) {
  // These meta tags will only be added during server-side rendering
  useSeoMeta({
    robots: "index, follow",
    title: "Boilerplate -Nuxt",
    author: "Anna-Olivia Lebert-Wietholtz",
    description: "Nuxt Boilerplate with EsLint,Typescript & Tailwind",
  });
}
</script>
<template>
  <div>
    <NuxtLayout>
      <!-- platzhalter für das gewählte layout rendert alle Kindelemente innerhalb des Layouts -->
      <NuxtRouteAnnouncer />
      <!-- hilfskomponente für barrierefreiheit ankündigung routing  -->
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
