export const useLoginModal = () => {
  const show = useState<boolean>("showLoginModal", () => false);
  const returnTo = useState<string>("returnTo", () => "/");
  const open = () => {
    show.value = true;
  };
  const close = () => {
    show.value = false;
  };
  const setReturnTo = (path: string) => {
    returnTo.value = path;
  };
  return { show, open, close, setReturnTo, returnTo };
};
