<script setup lang="ts">
import type { Ref, ComputedRef } from "vue";
import TextEcosia from "~/components/TextEcosia.vue";

definePageMeta({ middleware: "auth-client" });

useHead({
  meta: [{ name: "robots", content: "noindex, nofollow" }],
});

const session: Ref<string> = useCookie("session");

const loggedIn: ComputedRef<boolean> = computed(() => Boolean(session.value));
</script>
<template>
  <div>
    <AppHeader :show-login-button="false" />
    <div v-if="loggedIn">
      <section class="container mx-auto grid gap-10 px-4 py-6">
        <div class="grid gap-6 text-center">
          <h1 class="text-4xl font-bold tracking-tight">
            Hi <span class="text-orange-400">Ecosia </span>
          </h1>
          <p class="text-lg text-gray-600">
            I'm super glad you visit my little WebApp. It is a combination of a
            personal idea and a way to use Nuxt as it is part of your Tech
            Stack. If you want to know more about my motivation and experience
            during the coding process, just click the button ; )
          </p>
          <NuxtLink to="#ecosia" class="nav-link">
            <BasicButton to="#ecosia" variant="secondary"
              >Read more ...</BasicButton
            >
          </NuxtLink>
        </div>
      </section>
      <WorldMap />
      <TextEcosia id="ecosia" />
    </div>
    <div v-else aria-hidden="true" />
  </div>
</template>
