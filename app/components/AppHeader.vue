<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
/* wahrscheinlich besser mit navigateTo weil useRouter besser für back und forward also für Browser History und navigateTo ist SSR kompatibel, besseres Error Handling - useRoute ok weil nur auslesen aber halt sinnvoll bei mehreren spezifischen unterseiten im login bereich */
import { useCookie } from "#app";
import type { Ref, ComputedRef } from "vue";
// type only also kein code im bundler
import { useLoginModal, useAuthModel } from "#imports";

// 1. Types
const props = withDefaults(
  defineProps<{
    showLoginButton?: boolean;
    //optional auch auf false
  }>(),
  {
    showLoginButton: true,
  }
);
//standardmäßig true also login button wird gezeigt - damit bei map kein button mehr erscheint und beim zurückgehen -

const session: Ref<string | null> = useCookie("session");
// Ref type - reaktive referenz also automatische aktualisierung hier objekt - entweder session id also string oder null

// 2. reusable logik - useState aus composable
const route = useRoute();
// kann nur auslesen nicht navigieren
const router = useRouter();
//navigiert

//nur die fkts ich brauche also Destructuring
const { open, setReturnTo } = useLoginModal();
const { isAuthenticated } = useAuthModel();
const onLogin = () => {
  setReturnTo(route.fullPath);
  //fullPath aktuelle url speichern damit user eingeloggt dorthin zürck gelangt (redirect) - hier irgendwie obsolet weil ja nur index und map - abber sinnvoll bei spezifischen vorherigen unterseiten
  open();
  //LoginModal öffnen
};

const goToPage = () => {
  router.push("/map");
}; // hier besser:
//const goToPage = async(): Promise<void> => {
// await navigateTo("/map");};
// navigateTo bringt Promise zurück deswegen async await

//3. wann gehts auf unterseite
//erstmal prüfen ist user eingeloggt wenn über useAuthModel ja oder wenn cookie existiert also isAutenticated.value = true oder session.value = true
const isLoggedIn: ComputedRef<boolean> = computed(() => {
  return isAuthenticated.value || !!session.value;
  // !!session.value = Boolean(session.value) - also in true oder false konvertiert - wenn string dann true sonst false bzw. wenn null dann muss useAuthModel erstmal authentifizieren und Cookie vergeben
});

const buttonText: ComputedRef<string> = computed(() =>
  isLoggedIn.value ? "See Map" : "Login"
);
// dynamischer text damit wenn eingeloggt nicht login und dann zurück zur map möglich
//eigentlich veraltet weil dann entschieden dass garkein header im index

//werte werden automatisch neu berechnet wenn isAuthenticated.value und/oder isLoggIn.value sich ändert

const buttonAction = (): void => {
  if (isLoggedIn.value) goToPage();
  else onLogin();
};
//hier auch wahrscheinlich besser:
/* const buttonAction = async (): Promise<void> => {
  if (isLoggedIn.value) {
    await goToPage();
  } else {
    onLogin();
  }
}; */
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
        <BasicButton
          v-if="props.showLoginButton"
          variant="primary"
          @click="buttonAction"
        >
          {{ buttonText }}
        </BasicButton>
      </div>
    </nav>
  </header>
</template>
