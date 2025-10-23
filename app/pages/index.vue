<script setup lang="ts">
import { useSchemaOrg } from "#imports";
import { seoPage } from "~/types/seo";
import { ref } from "vue";

definePageMeta({ layout: "custom-layout" });
useSchemaOrg(seoPage("Landing", "Welcome"));

const tooltip = ref<{ x: number; y: number } | null>(null);

const onMouseMove = (evt: MouseEvent) => {
  if (!tooltip.value) {
    tooltip.value = { x: 0, y: 0 };
  }
  tooltip.value.x = evt.offsetX + 12;
  tooltip.value.y = evt.offsetY + 12;
};

const onLeave = () => {
  tooltip.value = null;
};
</script>
<template>
  <section
    class="container mx-auto grid gap-10 px-4 text-center text-lg text-gray-600"
  >
    <div class="flex justify-center">
      <NuxtPicture src="/logo.png" class="scale-75" />
      <div class="text-left place-self-center">
        <h1 class="text-black text-4xl font-bold">
          Global temperatures just one click away
        </h1>
        <p class="text-xl">
          An interactive map with time slider to explore temperature changes in
          world capitals.
        </p>
      </div>
    </div>
    <NuxtLink to="/map" class="relative mx-auto" @mousemove="onMouseMove">
      <!-- nuxtlink prüft ob navigieren erlaubt und lädt alle guards und middleware also auth.client.ts hier dann globale states prüfen ob user eingeloggt falls nicht wird in auth.client.ts !loggedIn getriggert -->
      <NuxtPicture src="/hero_v2.png" alt="Hero Bild" @mouseleave="onLeave" />
      <div
        v-if="tooltip"
        class="absolute bg-green-700 shadow rounded px-2 py-1 text-md font-inter text-white"
        :style="{ left: tooltip.x + 'px', top: tooltip.y + 'px' }"
      >
        Click me!
      </div>
    </NuxtLink>
    <GeneralAbout id="about" />
  </section>
</template>
