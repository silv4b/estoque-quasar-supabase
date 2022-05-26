import { useQuasar } from "quasar";

export default function useDialog() {
  const $q = useQuasar();

  function dialogShow(tittle, message) {
    return $q.dialog({
      title: tittle || "Sair",
      message: message || "Deseja realmente sair?",
      cancel: true,
      persistent: true,
    });
  }

  return {
    dialogShow
  };
}
