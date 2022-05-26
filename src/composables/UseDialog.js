import { useQuasar } from "quasar";

export default function useDialog() {
  const $q = useQuasar();

  /** Usando destructor na função dialogShow para controlar
   * os valores de título e mensagem que serão exibidos.
   */

  function dialogShow({ tittle: tittle, message: message }) {
    return $q.dialog({
      title: tittle || "Confirmação",
      message: message || "Dialig Message",
      cancel: true,
      persistent: true,
    });
  }

  return {
    dialogShow
  };
}
