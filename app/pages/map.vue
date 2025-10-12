<script setup lang="ts">
definePageMeta({ middleware: "auth-client" });
const session = useCookie("session");
const loggedIn = computed(() => Boolean(session.value));
useHead({
  meta: [{ name: "robots", content: "noindex, nofollow" }],
});
</script>
<template>
  <section>
    <div v-if="loggedIn">
      <h1>Private Subpage</h1>
    </div>
    <div v-else aria-hidden="true" />
  </section>
</template>
