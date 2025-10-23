<script setup lang="ts">
import type { Ref, ComputedRef } from "vue";
import TextEcosia from "~/components/TextEcosia.vue";

definePageMeta({ middleware: "auth-client" });
//prüft automatisch ob user authentifiziert also eingeloggt

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
        <div
          class="grid gap-6 text-center text-lg text-gray-600 tracking-tight"
        >
          <h1 class="text-4xl font-bold">
            Hi <span class="text-orange-400">Ecosia </span>
          </h1>
          <p>
            I'm super glad you visit my little WebApp. It is a combination of a
            personal idea and a way to use Nuxt as it is part of your Tech
            Stack.
            <br />
            If you want to know more about my motivation and experience during
            the coding process, just click
            <NuxtLink to="#ecosia" class="nav-link">
              <BasicButton variant="secondary">Read more ...</BasicButton>
            </NuxtLink>
          </p>

          <p>
            But for now <span class="text-orange-400">hover</span> over,
            <span class="text-orange-400">click</span> on the map and
            <span class="text-orange-400">use the slider</span>
            to travel in time.
          </p>
        </div>
      </section>
      <WorldMap />
      <TextEcosia id="ecosia" />
    </div>
    <div v-else aria-hidden="true" />
  </div>
</template>
