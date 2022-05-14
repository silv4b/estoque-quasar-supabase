import { useQuasar } from "quasar";

export default function useNotify() {
  const $q = useQuasar();

  const notifySuccess = (message) => {
    $q.notify({
      type: 'positive',
      message: message || "Tudo certo ✅",
      timeout: 1000,
      actions: [
        {
          label: "Ok",
          color: "white",
        },
      ],
    });
  };

  const notifyError = (message) => {
    $q.notify({
      type: 'negative',
      message: message || "Deu ruim 😢",
      timeout: 1000,
      actions: [
        {
          label: "Ok",
          color: "white",
        },
      ],
    });
  };

  return {
    notifySuccess,
    notifyError
  };
}
