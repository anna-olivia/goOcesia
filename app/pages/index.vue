<script setup lang="ts">
import { useSchemaOrg } from "#imports";
import { seoPage } from "~/types/seo";
definePageMeta({ layout: "custom-layout" });
useSchemaOrg(seoPage("Landing", "Welcome"));
</script>
<template>
  <section
    class="container mx-auto grid gap-10 px-4 py-20 text-center text-lg text-gray-600"
  >
    <h1 class="text-black text-4xl font-bold tracking-tight">
      Global Temperatures just one click away
    </h1>
    <p class="text-lg text-gray-600">
      An interactive map with time slider to explore temperature changes in
      world capitals.
    </p>

    <figure class="mx-auto">
      <NuxtPicture src="/hero.png" alt="Hero Bild" />
    </figure>
    <GeneralAbout id="about" />
  </section>
</template>
