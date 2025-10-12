export default defineNuxtRouteMiddleware(() => {
  const session = useCookie("session");
  const loggedIn = Boolean(session.value);
  const showLoginModal = useState("showLoginModal", () => false);
  const returnTo = useState("returnTo", () => "/");

  if (!loggedIn) {
    showLoginModal.value = true;
    returnTo.value = useRoute().fullPath;
  }
});
