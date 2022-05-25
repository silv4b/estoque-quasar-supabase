import { useQuasar } from "quasar";

export default function useDialog() {
  const $q = useQuasar();

  function dialogShow(title, message) {
    return $q.dialog({
      title: title || "Sair",
      message: message || "Deseja realmente sair?",
      cancel: true,
      persistent: true,
    });
  }

  return {
    dialogShow
  };
}
