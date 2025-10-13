<script setup lang="ts">
import { computed } from "vue";

type Variant = "primary" | "secondary" | "ghost";

const props = withDefaults(
  defineProps<{
    as?: "button" | "link";
    to?: string;
    variant?: Variant;
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
  }>(),
  {
    as: "button",
    to: "/#about",
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
</script>
<template>
  <NuxtLink v-if="as === 'link' && to" :to="to" :class="classes">
    <slot />
  </NuxtLink>
  <button v-else :class="classes" :disabled="disabled" :type="type">
    <slot />
  </button>
</template>
