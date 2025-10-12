<script setup lang="ts">
const consent = useState<"granted" | "denied" | null>("consent", () => null);
function grant() {
  consent.value = "granted";
}
function deny() {
  consent.value = "denied";
}
</script>

<template>
  <div v-if="consent === null" class="cookie-banner">
    <p>
      Diese Seite verwendet nur technisch notwendige Cookies; optionale
      Messungen sind deaktiviert bis zur Zustimmung.
    </p>
    <button @click="grant">Zustimmen</button>
    <button @click="deny">Ablehnen</button>
  </div>
</template>
